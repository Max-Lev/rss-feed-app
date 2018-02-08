import { SharedService } from './../../shared/shared.service';
import { IFeedMode, SELECT, DELETE } from './../../models/feed.status';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Feed } from './../../models/feed.model';
import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {

  @Input() feedList: Map<any, Feed> = new Map();

  constructor(private ref: ChangeDetectorRef, private sharedService: SharedService) { }

  ngOnInit() { };

  ngOnChanges(changes: SimpleChanges): void { };

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
