import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Injectable()
export class FormBuilderService {

  constructor(private formBuilder: FormBuilder) { };

  searchFormBuilder(): FormGroup {
    const searchForm = this.formBuilder.group({
      searchFeedName: [
        'http://www.feedforall.com/sample-feed.xml',
        [
          Validators.required
        ]]
    });
    return searchForm;
  };

}
