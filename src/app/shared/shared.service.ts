import { Feed } from './../models/feed.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { IFeedMode, DELETE, SELECT } from '../models/feed.status';
@Injectable()
export class SharedService {

  getFeedStatus$: BehaviorSubject<IFeedMode> = new BehaviorSubject(null);

  constructor() { };

  feedMode(mode: IFeedMode) {
    this.getFeedStatus$.next(mode);
  };



}
