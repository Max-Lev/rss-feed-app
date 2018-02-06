import { TestBed, inject } from '@angular/core/testing';

import { FeedSearchService } from './feed-search.service';

describe('FeedSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedSearchService]
    });
  });

  it('should be created', inject([FeedSearchService], (service: FeedSearchService) => {
    expect(service).toBeTruthy();
  }));
});
