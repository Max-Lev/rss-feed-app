import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Injectable()
export class FormBuilderService {

  constructor(private formBuilder: FormBuilder) { };

  searchFormBuilder(): FormGroup {
    const searchForm = this.formBuilder.group({
      searchFeedName: [
        // '',
        // 'http://www.feedforall.com/sample-feed.xml',
        'https://api.rss2json.com/v1/api.json?rss_url=http://www.feedforall.com/sample.xml',
        // 'http://www.feedforall.com/sample.xml',
        [
          Validators.required
        ]]
    });
    return searchForm;
  };

}
