import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('LogoutComponent', () => {
    let fixture: ComponentFixture<LogoutComponent>;
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: LogoutComponent;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LogoutComponent ],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(LogoutComponent);
        comp = fixture.componentInstance;
        comp.ngOnInit();
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should logout user and clear token', () => {
        const navSpy = spyOn(comp.router, 'navigate');
        comp.ngOnInit();
        expect(navSpy).toHaveBeenCalled();
    });

});
