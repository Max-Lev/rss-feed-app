import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './../../shared/shared.service';
import { IFeedMode, SELECT, DELETE } from './../../models/feed.status';
import { OnChanges, AfterViewInit, AfterContentInit, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { Feed } from './../../models/feed.model';
import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges {

  @Input() feedList: Array<Feed> = [];

  feed$$: Array<Feed> = [];

  list$: Subject<any> = new Subject();

  subscription: Subscription;

  constructor(private ref: ChangeDetectorRef, private sharedService: SharedService) { };

  ngOnInit() { };

  ngOnChanges(changes: SimpleChanges): void {
    this.feedView_ListAgregator();
  };

  ngAfterContentInit(): void { };

  ngAfterViewInit(): void {
    this.feedListObserver$();
  };

  feedView_ListAgregator() {
    if (this.feedList.length !== 0) {
      this.feed$$.push(this.feedList[0]);
      this.setSelectedItemUI(this.feedList[0])(this.resetSelectedItems());
      this.list$.next(this.feedList);
      this.ref.markForCheck();
    }
  };

  feedListObserver$() {
    this.subscription = this.list$.subscribe((obs) => {
      console.log('obs: ', obs);
      return obs;
    });
  };

  select(feed: Feed) {
    this.resetSelectedItems();
    const activeFeed: Feed = Object.assign(feed, { isActive: true });
    const mode: IFeedMode = { feed: activeFeed, mode: SELECT };
    this.sharedService.feedState$(mode);
  };

  remove(feed: Feed) {
    this.resetSelectedItems();
    const mode: IFeedMode = { feed: feed, mode: DELETE };
    this.sharedService.feedState$(mode);
    this.feed$$ = this.feed$$.filter(item => { if (item.feedID !== mode.feed.feedID) { return item; } });
    this.ref.markForCheck();
  };

  setSelectedItemUI(feed: Feed): any {
    return () => { const item = this.feed$$[this.feed$$.length - 1].isActive = true; }
  };

  resetSelectedItems() {
    this.feed$$.forEach(item => item.isActive = false);
  };

}
