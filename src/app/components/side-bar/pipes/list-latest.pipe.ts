import { Feed } from './../../../models/feed.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listLatest'
})
export class ListLatestPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let list: Array<Feed> = [];
    if (value !== undefined) {
      list = Array.from(value);
      return list.reverse();
    }
    return list;
  }

}
