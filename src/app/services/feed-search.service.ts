import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class FeedSearchService {

  // tslint:disable-next-line:no-inferrable-types
  feedParser: string = 'https://api.rss2json.com/v1/api.json?rss_url=';

  constructor(private httpClient: HttpClient, private router: Router) { };

  search(feed: string): Observable<any> {

    const response$: Subject<any> = new Subject();
    const feedUrl: string = this.urlFormatter(feed);

    this.httpClient.get(feedUrl).subscribe((response) => {
      console.log(response);
      response$.next(response);
      this.router.navigate(['.'], { queryParams: { feed: feed } });
      console.log(window.history)
      return response;
    }, (err) => { throw err; });

    return response$;
  };

  urlFormatter(feedpath: string): string {
    return `${this.feedParser}${feedpath}`;
  };

};


// const feedUrl: string = 'https://dog.ceo/api/breeds/list/all'
    // console.log(feedUrl);
    // const params = new HttpParams().append('firstName', 'John').append('lastName', 'Doe');
    // const x = location.href + '?name=z`z`z';
    // window.location.replace(x);
