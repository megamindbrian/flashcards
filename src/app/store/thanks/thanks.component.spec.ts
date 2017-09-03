import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksComponent } from './thanks.component';

describe('ThanksComponent', () => {
    let component: ThanksComponent;
    let fixture: ComponentFixture<ThanksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ThanksComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThanksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});