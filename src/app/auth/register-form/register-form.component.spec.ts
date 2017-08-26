import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('RegisterComponent', () => {
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
    });

    it('should create RegisterFormComponent', done => {
        fixture.whenStable().then(() => {
            expect(comp).not.toBeNull('should be created successfully');
            done();
        });
    });

    it('onRegister() should show done message', done => {
        const navigateSpy = spyOn((comp as any).router, 'navigate');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.onRegister();
            expect(navigateSpy).toHaveBeenCalledTimes(0);

            comp.user.setEmail('megamindbrian@gmail.com');
            comp.user.setFirstName('Brian');
            comp.user.setLastName('C');
            comp.user.setPassword('tEst12345!');
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                comp.onRegister();
                expect(comp.message).toBeUndefined();
                expect(navigateSpy).toHaveBeenCalledWith([ '/' ]);
                done();
            });
        });
    });
});

