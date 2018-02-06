import { Feed } from './../../models/feed.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-feed-list-container',
  templateUrl: './feed-list-container.component.html',
  styleUrls: ['./feed-list-container.component.scss']
})
export class FeedListContainerComponent implements OnInit, OnChanges {

  @Input() feedList: Map<any, Feed> = new Map();

  constructor() { }

  ngOnInit() { };

  ngOnChanges(changes: SimpleChanges): void {
    const list = Array.from(this.feedList.values());
    console.log(this.feedList.values());
  };

  remove(feed: Feed) {
    debugger;
  };

}
