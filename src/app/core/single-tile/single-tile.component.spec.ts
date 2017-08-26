import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTileComponent } from './single-tile.component';

describe('SingleTileComponent', () => {
    let component: SingleTileComponent;
    let fixture: ComponentFixture<SingleTileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SingleTileComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
