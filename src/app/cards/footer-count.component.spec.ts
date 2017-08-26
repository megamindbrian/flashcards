import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCountComponent } from './footer-count.component';

describe('FooterCountComponent', () => {
    let component: FooterCountComponent;
    let fixture: ComponentFixture<FooterCountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FooterCountComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
