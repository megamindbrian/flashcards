import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginComponent } from './login.component';
import { ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: LoginComponent;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'auth/login',
                        component: LoginComponent
                    },
                    {
                        path: 'auth/register',
                        component: LoginComponent
                    }
                ]),
                ...testingPlatformModules
            ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
        xhr.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response({
                body: JSON.stringify('hit')
            } as ResponseOptions));
        });

    });

    it('should load LoginComponent', done => {
        expect(comp).not.toBeNull('should be created successfully');

        fixture.whenStable().then(() => {
            done();
        });
    });

    it('should require password', done => {
        const loginSpy = spyOn(comp.auth, 'login');
        fixture.whenStable().then(() => {
            comp.onLogin();
            expect(loginSpy).toHaveBeenCalledTimes(0);
            done();
        });
    });

    it('should login user', done => {
        const navigateSpy = spyOn(comp.router, 'navigate');
        fixture.whenStable().then(() => {
            comp.user.setEmail('megamindbrian@gmail.com');
            comp.user.setPassword('some password');
            comp.onLogin();
            fixture.whenStable().then(() => {
                expect(navigateSpy).toHaveBeenCalledWith([ '/' ]);
                done();
            });
        });
    });

    it('should register a user and log in', done => {
        const navSpy = spyOn(comp.router, 'navigate');
        comp.isRegister = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.onRegister();
            expect(navSpy.calls.any()).toBeFalsy();

            comp.user.setEmail('megamindbrian@gmail.com');
            comp.user.setFirstName('Brian');
            comp.user.setLastName('C');
            comp.user.setPassword('tEst12345!');
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                comp.onRegister();
                expect(comp.message).toBeUndefined();
                expect(navSpy.calls.any()).toBeTruthy();
                done();
            });
        });
    });

    it('should switch to register form', done => {
        done();
    });

});

