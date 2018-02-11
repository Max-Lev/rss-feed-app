import { Feed } from './../models/feed.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { IFeedMode, DELETE, SELECT } from '../models/feed.status';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FeedSearchService } from '../services/feed-search.service';
import { DeepLinkingService } from '../services/deep-linking.service';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SharedService {

  getFeedStatus$: BehaviorSubject<IFeedMode> = new BehaviorSubject(null);

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private deepLinkingService: DeepLinkingService, private feedSearchService: FeedSearchService) {

  };

  feedState$(mode: IFeedMode) {
    this.getFeedStatus$.next(mode);
  };


  setAppStorage() {

  };


}
