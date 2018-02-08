import { IFeedItems } from './../../models/feed.model';
import { SharedService } from './../../shared/shared.service';
import { DeepLinkingService } from './../../services/deep-linking.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { AfterViewInit, OnDestroy, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FeedSearchService } from '../../services/feed-search.service';
import { Feed, IFeed } from '../../models/feed.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IFeedMode, SELECT } from '../../models/feed.status';

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedContainerComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {

  subscription: Subscription;
  feedContentItemsList: Array<Feed> = [];
  feedContentItemsUrlTitle: string;
  feedListMap: Map<any, Feed> = new Map();
  feedListSet: Set<Feed> = new Set();

  constructor(private deepLinkingService: DeepLinkingService, private sharedService: SharedService,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef, private feedSearchService: FeedSearchService) { }

  ngOnInit() {
    this.getCurrentParams();
  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  ngAfterViewInit(): void {
    this.searchFeed$();
    this.feedStatusManager$();
  };

  ngAfterContentInit(): void { };

  getCurrentParams() {
    const params = this.deepLinkingService.onloadUrlParams('feed');
  };

  searchFeed$() {
    this.subscription = this.feedSearchService.searchDataResponse$.subscribe((feedResponse) => {

      const feed = this.setFeedModel(feedResponse);
      this.setUI(feed)
      console.log('feedListMap: ', this.feedListMap);
      return feedResponse;

    });
  };

  setUI(feed: Feed) {
    this.setContentTitle(feed);
    this.feedListMap.set(`feedID:${feed.feedID}`, feed);
    // this.feedListSet.add(feed);
    this.feedContentItemsList = [feed];
    this.ref.detectChanges();
  };


  feedStatusManager$() {
    this.subscription = this.sharedService.getFeedStatus$.subscribe((mode: IFeedMode) => {
      if (mode !== null) {
        if (mode.mode === SELECT) {
          this.setContent_View_Items(mode)
        } else {
          this.removeContent_View_Items(mode);
        }
      }
      return mode;
    });
  };

  setContentTitle(feed: Feed | null) {
    this.feedContentItemsUrlTitle = (feed !== null) ? feed.url : '';
    this.ref.detectChanges();
  };

  setContent_View_Items(mode: IFeedMode) {
    this.feedContentItemsList = [mode.feed];
    this.setContentTitle(mode.feed);
  };

  removeContent_View_Items(mode: IFeedMode) {
    debugger;
    this.feedContentItemsList;
    this.feedListMap.delete(`feedID:${mode.feed.feedID}`);
    if (mode.feed.isActive || this.feedListMap.size === 0) {
      this.setContentTitle(null);
      this.feedContentItemsList = [];
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
