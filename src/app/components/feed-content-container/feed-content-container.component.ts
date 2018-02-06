import { Feed } from './../../models/feed.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feed-content-container',
  templateUrl: './feed-content-container.component.html',
  styleUrls: ['./feed-content-container.component.scss']
})
export class FeedContentContainerComponent implements OnInit {

  @Input() feedList: Map<any, Feed> = new Map();

  constructor() { }

  ngOnInit() {

  };

}
