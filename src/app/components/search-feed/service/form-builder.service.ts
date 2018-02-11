import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Injectable()
export class FormBuilderService {

  constructor(private formBuilder: FormBuilder) { };

  searchFormBuilder(): FormGroup {
    const searchForm = this.formBuilder.group({
      searchFeedName: [
        '',
        [
          Validators.required,
          Validators.pattern('^(http:\/\/www.|https:\/\/www.)[a-zA-Z]{0,}(.com\/)[a-zA-Z-]{0,}(.xml)')
        ]]
    });
    return searchForm;
  };

}
