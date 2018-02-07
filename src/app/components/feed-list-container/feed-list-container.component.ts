import { IFeedMode, DELETE, SELECT } from './../../models/feed.status';
import { Feed } from './../../models/feed.model';
import { Component, OnInit, Input, SimpleChanges, DoCheck } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgZone } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-feed-list-container',
  templateUrl: './feed-list-container.component.html',
  styleUrls: ['./feed-list-container.component.scss']
})
export class FeedListContainerComponent implements OnInit,
  //OnChanges,
  DoCheck 
  {

  // @Input() feedList: Map<any, Feed> = new Map();
  @Input() feedList: Array<Feed> = [];

  constructor(private sharedService: SharedService, private ref: ChangeDetectorRef) { };

  ngOnInit() { };

  ngDoCheck(): void {
    const list = Array.from(this.feedList.values());
    // debugger;
    // console.log('feed-list: ', this.feedList.values());
    this.ref.markForCheck();
  };

  // ngOnChanges(changes: SimpleChanges): void {
  //   const list = Array.from(this.feedList.values());
  //   debugger;
  //   console.log('feed-list: ', this.feedList.values());
  //   this.ref.markForCheck();
  // };

  select(feed: Feed) {
    this.feedList.forEach(item => item.isActive = false);
    const activeFeed: Feed = Object.assign(feed, { isActive: true });
    const mode: IFeedMode = { feed: activeFeed, mode: SELECT };
    this.sharedService.feedMode(mode);
  };

  remove(feed: Feed) {
    const mode: IFeedMode = { feed: feed, mode: DELETE };
    this.sharedService.feedMode(mode);
  };



}
