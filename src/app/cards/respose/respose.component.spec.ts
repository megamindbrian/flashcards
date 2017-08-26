import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResposeComponent } from './respose.component';

describe('ResposeComponent', () => {
    let component: ResposeComponent;
    let fixture: ComponentFixture<ResposeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ResposeComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResposeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
