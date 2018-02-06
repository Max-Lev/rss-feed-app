import { Feed } from './../../../models/feed.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {

  @Input() feed: Feed;

  constructor() { }

  ngOnInit() {
  }

}
