import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class FeedSearchService {

  // tslint:disable-next-line:no-inferrable-types
  feedParserURL: string = 'https://api.rss2json.com/v1/api.json?rss_url=';

  searchDataResponse$: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) { };

  urlFormatter(feedpath: string): string { return `${this.feedParserURL}${feedpath}`; };

  setSearchParamsURL(feed: string) { this.router.navigate(['.'], { queryParams: { feed: feed } }); };

  searchFeed(feeduri: string): Observable<any> {
    
    const feedAPIUrl: string = this.urlFormatter(feeduri);

    this.httpClient.get(feedAPIUrl).subscribe((response: any) => {

      if (response.status === 'ok') {
        this.searchDataResponse$.next({ ...response });
        this.setSearchParamsURL(feeduri);
      } else {
        console.log('error: ', response);
        Observable.throw('err');
      }
      return response;
    });
    return this.searchDataResponse$;
  };



};


