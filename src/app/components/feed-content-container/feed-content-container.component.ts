import { OnChanges, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ContentItemDirective } from './content-item.directive';
import { Feed } from './../../models/feed.model';
import { Component, OnInit, Input, ViewChild, TemplateRef, SimpleChanges, ContentChildren } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-feed-content-container',
  templateUrl: './feed-content-container.component.html',
  styleUrls: ['./feed-content-container.component.scss']
})
export class FeedContentContainerComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() feedList: Feed[] = [];

  feedDataContext = { defaultViewData: [] };

  constructor() {

  };

  ngOnInit() { };

  ngOnChanges(changes: SimpleChanges): void {
    this.renderContentTemplate();
    console.log(this.feedList)
  };

  ngAfterViewInit(): void {

  };

  renderContentTemplate() {
    this.feedDataContext['defaultViewData'] = this.feedList;
  };

}
