import { TestBed } from '@angular/core/testing';

import { MvpKruzerService } from './mvp-kruzer.service';

describe('MvpKruzerService', () => {
  let service: MvpKruzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MvpKruzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
