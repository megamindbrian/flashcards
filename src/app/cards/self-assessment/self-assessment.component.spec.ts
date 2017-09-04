import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfassessmentComponent } from './self-assessment.component';

describe('SelfassessmentComponent', () => {
    let component: SelfassessmentComponent;
    let fixture: ComponentFixture<SelfassessmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SelfassessmentComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelfassessmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
