import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackEditComponent } from './pack-edit.component';

describe('PackEditComponent', () => {
    let component: PackEditComponent;
    let fixture: ComponentFixture<PackEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PackEditComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PackEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
