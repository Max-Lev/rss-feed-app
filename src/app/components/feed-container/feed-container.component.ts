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
  feedList: Feed[] = [];
  feedListMap: Map<any, Feed> = new Map();
  feedListSet: Set<Feed> = new Set();

  constructor(private deepLinkingService: DeepLinkingService,
    private ref: ChangeDetectorRef,
    private feedSearchService: FeedSearchService) { }

  ngOnInit() {
    this.getCurrentParams();
  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  ngAfterViewInit(): void {

    this.getFeedData$();
  };
  ngAfterContentInit(): void { };

  getCurrentParams() {
    const params = this.deepLinkingService.getUrlParams('feed');
    const queryParams = this.deepLinkingService.getCurrentParams('feed');
    console.log(queryParams);
  };

  getFeedData$() {
    this.subscription = this.feedSearchService.searchDataResponse$.subscribe((feedResponse) => {
      const feedID = this.setID();
      const feed = new Feed(feedID, feedResponse.feed, feedResponse.items);
      this.feedListSet.add(feed);

      this.feedListMap.set({ feedID: this.feedListMap.size + 1 }, feed);
      this.feedList.push(feed);

      this.ref.detectChanges();
      return feedResponse;
    });
  };

  setFeedModel(feedResponse: Feed): Feed {
    const feedID = this.setID();
    const feed = new Feed(feedID, feedResponse['feed'], feedResponse['items']);
    return feed;
  };

  setID(): number {
    return this.feedListMap.size + 1;
  };

}
