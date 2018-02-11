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

  set_urlQueryParams(feedurl: string) { this.router.navigate(['.'], { queryParams: { feed: feedurl } }); };

  searchFeed(feeduri: string): Observable<any> {
    if (feeduri !== null) {
      const feedAPIUrl: string = this.urlFormatter(feeduri);
      this.httpClient.get(feedAPIUrl).subscribe((response: any) => {
        if (response.status === 'ok') {
          this.searchDataResponse$.next({ ...response });
          this.set_urlQueryParams(feeduri);
        } else {
          console.log('error: ', response, feedAPIUrl);
          Observable.throw('err');
        }
        return response;
      });
      return this.searchDataResponse$;
    };
  };
};






