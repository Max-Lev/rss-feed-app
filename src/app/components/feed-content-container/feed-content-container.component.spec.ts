import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedContentContainerComponent } from './feed-content-container.component';

describe('FeedContentContainerComponent', () => {
  let component: FeedContentContainerComponent;
  let fixture: ComponentFixture<FeedContentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedContentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
