import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';
import { AppComponent } from '../../app.component';

describe('ForgotPasswordComponent', () => {
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent, ForgotPasswordComponent, LoginComponent ],
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'auth/login',
                        component: LoginComponent
                    },
                    {
                        path: 'auth/forgot',
                        component: ForgotPasswordComponent
                    }
                ]),
                ...testingPlatformModules
            ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('can load ForgotPasswordComponent', done => {
        fixture.whenStable().then(() => {
            expect(comp).not.toBeUndefined();
            done();
        });
    });

    it('should show forgot Password message', () => {
        comp.email = 'megamindbrian@gmail.com';
        const spy = spyOn(comp.router, 'navigate');
        comp.onNext();
        expect(spy).toHaveBeenCalledWith([ '/auth/login', {forgot: true} ]);
    });

});

