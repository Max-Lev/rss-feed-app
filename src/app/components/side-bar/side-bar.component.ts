import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Feed } from './../../models/feed.model';
import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {

  @Input() feedList: Map<any, Feed> = new Map();

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() { };

  ngOnChanges(changes: SimpleChanges): void { };

}
