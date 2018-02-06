import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class DeepLinkingService {

  constructor(private router: Router) { };

  getUrlParams(searchParamName: string): string {
    const searchParams = new URLSearchParams(location.search.substring(1));
    const params = searchParams.get(searchParamName);
    console.log(searchParamName, params);
    return params;
  };

  getCurrentParams(searchParamName: string): string {
    const queryParams = this.router.parseUrl(location.search);
    console.log('queryParams: ', queryParams[searchParamName]);
    return queryParams[searchParamName];
  };

}
