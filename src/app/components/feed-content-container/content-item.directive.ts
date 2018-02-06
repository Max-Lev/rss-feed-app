import { Directive, TemplateRef, Input } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appContentItem]'
})
export class ContentItemDirective {

  @Input() public list;

  constructor(public viewContainer: ViewContainerRef) { }

}
