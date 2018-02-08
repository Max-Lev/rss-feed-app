import { OnChanges, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ContentItemDirective } from './content-item.directive';
import { Feed } from './../../models/feed.model';
import {
  Component, OnInit, Input, ViewChild, TemplateRef, SimpleChanges, ContentChildren, Pipe
} from '@angular/core';
import { ViewChildren, PipeTransform } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

@Pipe({ name: 'contentFilter' })
export class ContentFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    let list: Array<Feed> = [];
    if (value !== undefined) {
      list = Array.from(value);
      debugger;
      return list.reverse();
    }
    return list;
  }
};


@Component({
  selector: 'app-feed-content-container',
  templateUrl: './feed-content-container.component.html',
  styleUrls: ['./feed-content-container.component.scss'],
  providers: [ContentFilterPipe],
})
export class FeedContentContainerComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() feedList: Feed[] = [];

  feedDataContext = { defaultViewData: [] };

  constructor() { };

  ngOnInit() { };

  ngOnChanges(changes: SimpleChanges): void {
    this.renderContentTemplate();
  };

  ngAfterViewInit(): void { };

  renderContentTemplate() {
    // tslint:disable-next-line:max-line-length
    (this.feedList[0] !== undefined) ? this.feedDataContext['defaultViewData'] = this.feedList[0].items : this.feedDataContext['defaultViewData'] = [];
  };




}
