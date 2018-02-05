import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListContainerComponent } from './feed-list-container.component';

describe('FeedListContainerComponent', () => {
  let component: FeedListContainerComponent;
  let fixture: ComponentFixture<FeedListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
