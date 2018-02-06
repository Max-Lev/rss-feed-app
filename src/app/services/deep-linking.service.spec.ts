import { TestBed, inject } from '@angular/core/testing';

import { DeepLinkingService } from './deep-linking.service';

describe('DeepLinkingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeepLinkingService]
    });
  });

  it('should be created', inject([DeepLinkingService], (service: DeepLinkingService) => {
    expect(service).toBeTruthy();
  }));
});
