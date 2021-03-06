import { FeedSearchService } from './../../services/feed-search.service';
import { FormBuilderService } from './service/form-builder.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.scss']
})
export class SearchFeedComponent implements OnInit, AfterViewInit {

  searchFeedForm: FormGroup;

  constructor(private formBuilderService: FormBuilderService, private feedSearchService: FeedSearchService) {
    this.searchFeedForm = this.formBuilderService.searchFormBuilder();
  };

  ngOnInit() { };

  ngAfterViewInit(): void {
    this.searchSubmit();
  };

  searchSubmit() {
    if (this.searchFeedForm.valid) {
      const feed: string = this.searchFeedForm.controls.searchFeedName.value;
      this.feedSearchService.searchFeed(feed);
    }
  };

}
