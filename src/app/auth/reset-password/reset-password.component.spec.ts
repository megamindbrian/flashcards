import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('ResetPasswordComponent', () => {
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ResetPasswordComponent ],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(ResetPasswordComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should load ResetPasswordComponent', done => {
        fixture.whenStable().then(() => {
            expect(comp).not.toBeNull('should be created successfully');
            done();
        });
    });

    it('should reset user Password', done => {
        const navigateSpy = spyOn((<any>comp).router, 'navigate');
        fixture.whenStable().then(() => {
            comp.onNext();
            expect(navigateSpy).toHaveBeenCalledWith([ '/' ]);
            done();
        });
    });

});

