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

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedContainerComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {

  subscription: Subscription;
  feedContentItemsList: Feed[] = [];
  feedListMap: Map<any, Feed> = new Map();
  feedListSet: Set<Feed> = new Set();

  constructor(private deepLinkingService: DeepLinkingService,
    private sharedService: SharedService,
    private ref: ChangeDetectorRef, private feedSearchService: FeedSearchService) { }

  ngOnInit() {
    this.getCurrentParams();
  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  ngAfterViewInit(): void {
    this.getFeedData$();
    this.getSelectedFeed$();
  };

  ngAfterContentInit(): void { };

  getCurrentParams() {
    const params = this.deepLinkingService.getUrlParams('feed');
  };

  getFeedData$() {
    this.subscription = this.feedSearchService.searchDataResponse$.subscribe((feedResponse) => {

      const feed = this.setFeedModel(feedResponse);
      this.feedListSet.add(feed);
      this.feedListMap.set({ feedID: feed.feedID }, feed);
      // this.feedListMap.set(`feedID:${feed.feedID}`, feed);
      this.feedContentItemsList = [feedResponse['items']];
      console.log('feedListMap: ', this.feedListMap);
      this.ref.detectChanges();
      return feedResponse;

    });
  };

  getSelectedFeed$() {
    this.subscription = this.sharedService.selectedItem$.subscribe((feed) => {
      if (feed !== null) {
        this.feedContentItemsList = [feed.items];
      }
      return feed;
    });

  };

  setFeedModel(feedResponse: Feed): Feed {
    const feedID = this.feedListMap.size + 1;
    const feed = new Feed(feedID, feedResponse['feed'], feedResponse['items']);
    return feed;
  };

}
