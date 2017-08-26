import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchUsersComponent } from './switch-users.component';

describe('SwitchUsersComponent', () => {
    let component: SwitchUsersComponent;
    let fixture: ComponentFixture<SwitchUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SwitchUsersComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
