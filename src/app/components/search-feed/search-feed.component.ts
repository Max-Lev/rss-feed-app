import { FeedSearchService } from './../../services/feed-search.service';
import { FormBuilderService } from './service/form-builder.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.scss']
})
export class SearchFeedComponent implements OnInit {

  searchFeedForm: FormGroup;

  constructor(private formBuilderService: FormBuilderService, private feedSearchService: FeedSearchService) {
    this.searchFeedForm = this.formBuilderService.searchFormBuilder();
  };

  ngOnInit() {

  };

  searchSubmit() {
    if (this.searchFeedForm.valid) {
      const feed: string = this.searchFeedForm.controls.searchFeedName.value;
      this.feedSearchService.search(feed);
    }
  };

}
