import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Observer } from 'rxjs/Observer';


@Injectable()
export class FeedSearchService {

  // tslint:disable-next-line:no-inferrable-types
  feedParserURL: string = 'https://api.rss2json.com/v1/api.json?rss_url=';

  searchDataResponse$: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) { };

  urlFormatter(feedpath: string): string {
    return `${this.feedParserURL}${feedpath}`;
  };

  setSearchParamsURL(feed: string) {
    this.router.navigate(['.'], { queryParams: { feed: feed } });
  };

  searchFeed(feed: string): Observable<any> {

    const feedUrl: string = this.urlFormatter(feed);
    this.httpClient.get(feedUrl).subscribe((response: any) => {

      this.searchDataResponse$.next({ ...response });

      this.setSearchParamsURL(feed);
      return response;

    }, (err) => { throw err; });

    return this.searchDataResponse$;
  };



};


