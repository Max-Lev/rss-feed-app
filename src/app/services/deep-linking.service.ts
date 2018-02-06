import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DeepLinkingService {

  constructor(private router: Router, private activeRoute: ActivatedRoute) { };

  getUrlParams(searchParamName: string): string {
    const searchParams = new URLSearchParams(location.search.substring(1));
    const params = searchParams.get(searchParamName);
    console.log(searchParamName, params);
    return params;
  };

  getActiveQueryParams$(searchParamName: string): string {
    let activeparams;
    this.activeRoute.queryParams.subscribe((params) => {
      console.log('params$ ', params);
      activeparams = params;
      return params;
    });
    return activeparams;
  };

}
