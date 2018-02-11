import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { IFeedItems } from './../../models/feed.model';
import { SharedService } from './../../shared/shared.service';
import { DeepLinkingService } from './../../services/deep-linking.service';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, OnDestroy, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FeedSearchService } from '../../services/feed-search.service';
import { Feed, IFeed } from '../../models/feed.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import { IFeedMode, SELECT } from '../../models/feed.status';

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedContainerComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {

  subscription: Subscription;
  sideBar_FeedList: Array<Feed> = [];
  feedContent_view: Array<Feed> = [];
  feedContentItemsUrlTitle: string;
  feedListMap: Map<any, Feed> = new Map();

  constructor(private deepLinkingService: DeepLinkingService, private sharedService: SharedService,
    private activeRoute: ActivatedRoute, private router: Router,
    private ref: ChangeDetectorRef, private feedSearchService: FeedSearchService) { }

  ngOnInit() {
    this.getStorageItems();
    this.getCurrentParams();
  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  ngAfterViewInit(): void {
    this.searchFeed$();
    this.feedStatusManager$();
    this.historyNav$();
  };

  ngAfterContentInit(): void { };

  getStorageItems() {
    this.sharedService.getStorageList().map(item => {
      if (item !== undefined) {
        this.setFeedData(item);
        this.feedSearchService.set_urlQueryParams(item.url);
      }
    });
  };

  historyNav$() {
    Observable.fromEvent(window, 'popstate').subscribe((state) => {
      setTimeout(() => {
        const feedurl = this.activeRoute.snapshot.queryParams['feed'];
        const list: Array<Feed> = Array.from(this.feedListMap.values());
        list.map(item => item.isActive = false);
        const feed: Feed = list.find(item => item.url === feedurl);
        if (feed !== undefined) { feed.isActive = true; }
        this.feedContent_view = [feed];
        this.setContentTitle(feed);
        this.ref.detectChanges();
      }, 0);
    });
  };

  getCurrentParams() {
    const params = this.deepLinkingService.onloadUrlParams('feed');
  };

  searchFeed$() {
    this.subscription = this.feedSearchService.searchDataResponse$.subscribe((feedResponse) => {
      const feed = this.setFeedModel(feedResponse);
      this.response_uiContainer(feed);
      return feedResponse;
    });
  };

  response_uiContainer(feed: Feed) {
    const existing = Array.from(this.feedListMap.values());
    if (!existing.some(item => item.url === feed.url)) {
      this.sharedService.setAppStorage(feed);
      this.setFeedData(feed);
      this.ref.detectChanges();
    }
  };

  setFeedData(feed: Feed) {
    this.feedListMap.set(`feedID:${feed.feedID}`, feed);
    this.sideBar_FeedList = [feed];
    this.feedContent_view = [feed];
    this.setContentTitle(feed);
  };

  feedStatusManager$() {
    this.subscription = this.sharedService.getFeedStatus$.subscribe((mode: IFeedMode) => {
      if (mode !== null) {
        if (mode.mode === SELECT) {
          this.setContent_View_Items(mode);
        } else {
          this.remove_ActionStore(mode);
        }
      }
      this.ref.detectChanges();
      return mode;
    });
  };

  setContentTitle(feed: Feed | null) {
    // this.feedContentItemsUrlTitle = (feed !== null) ? feed.url : '';
    this.feedContentItemsUrlTitle = (feed !== undefined) ? feed.url : '';
    this.ref.detectChanges();
  };

  setContent_View_Items(mode: IFeedMode) {
    this.feedContent_view = [mode.feed];
    this.setContentTitle(mode.feed);
  };

  remove_ActionStore(mode: IFeedMode) {
    this.feedListMap.delete(`feedID:${mode.feed.feedID}`);
    this.remove_ActionViewRenderer(mode.feed.feedID, false);
    this.sharedService.removeAppStorage(mode.feed);
  };

  remove_ActionViewRenderer(id: number, isActive: boolean) {
    if (this.feedListMap.size > 0) {
      const values = this.feedListMap.values();
      const list = Array.from(values);
      const listid = list.map(item => item.feedID);
      const maxid = Math.max(...listid);
      const activeview = list.find(item => item.feedID === maxid);
      activeview.isActive = true;
      this.feedContent_view = [activeview];
      this.setContentTitle(activeview);
      this.ref.detectChanges();
    } else {
      this.setContentTitle(null);
      this.feedContent_view = [];
      this.ref.detectChanges();
    }
  };

  setFeedModel(feedResponse: Feed): Feed {
    const feedID = (this.feedListMap.size === 0) ? this.feedListMap.size + 1 : this.trackID();
    const feed = new Feed(feedID, feedResponse['feed'], feedResponse['items'], false);
    return feed;
  };

  trackID(): number {
    const values = this.feedListMap.values();
    const list = Array.from(values);
    const idlist = list.map(item => item.feedID);
    const maxID = Math.max(...idlist);
    return maxID + 1;
  };

}
