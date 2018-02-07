import { Feed } from './../models/feed.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
@Injectable()
export class SharedService {

  selectedItem$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {

  };

  selectedFeed(feed: Feed) {
    this.selectedItem$.next(feed);
  };



}
