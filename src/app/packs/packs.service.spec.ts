import { TestBed, inject } from '@angular/core/testing';

import { PacksService } from './packs.service';

describe('PacksService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ PacksService ]
        });
    });

    it('should be created', inject([ PacksService ], (service: PacksService) => {
        expect(service).toBeTruthy();
    }));
});
