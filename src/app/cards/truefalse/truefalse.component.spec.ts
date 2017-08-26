import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruefalseComponent } from './truefalse.component';

describe('TruefalseComponent', () => {
    let component: TruefalseComponent;
    let fixture: ComponentFixture<TruefalseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TruefalseComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruefalseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
