import {} from 'jasmine';
import { AuthService } from './auth.service';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions, XHRBackend } from '@angular/http';
import { AuthGuard } from './auth-guard';
import { AppComponent } from '../app.component';
import { AuthServiceStub } from '../../testing/auth-stubs';
import { AuthManager } from './auth.manager';
import { Observable } from 'rxjs/Observable';
import { UserBlueprint } from '../../testing/auth-user.blueprint';
import { LogService } from '../core/log/log.service';
import { RouterTestingModule } from '@angular/router/testing';
import { authTestingProviders, testingPlatformModules } from '../../testing/core-stubs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'auth',
                        loadChildren: './auth.module#AuthModule'
                    }
                ]),
                ...testingPlatformModules
            ],
            providers: [
                ...authTestingProviders
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
    });

    it(
        'can instantiate service when service is injected',
        inject([AuthService], (service: AuthService) => {
            expect(service instanceof AuthServiceStub).toBe(true);
        }));

    it(
        'can instantiate AuthGuard',
        inject([AuthGuard], (service: AuthGuard) => {
            expect(service instanceof AuthGuard).toBe(true);
        }));

    it(
        'can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        })
    );

    describe('isLoggedIn', () => {
        let api: HttpClient;
        let backend: MockBackend;
        let service: AuthService;
        let authManager: AuthManager;
        let response: Response;

        beforeEach(inject(
            [HttpClient, LogService, AuthManager, MockBackend],
            (http: HttpClient, log: LogService, auth: AuthManager, be: MockBackend) => {
                backend = be;
                api = http;
                authManager = auth;
                service = new AuthService(http, log, auth);
                const options = new ResponseOptions({status: 200, body: {data: {auth_token: 'token'}}});
                response = new Response(options);
            }));

        it('should check AuthManger for a token', () => {
            const spy = spyOn(authManager, 'getDecodedToken');

            service.isLoggedIn();

            expect(spy).toHaveBeenCalled();
        });

        it('returns true if a token exists', () => {
            spyOn(authManager, 'getDecodedToken').and.returnValue({});

            expect(service.isLoggedIn()).toBe(true, 'should be true when token exists');
        });

        it('returns false if a token does not exist', () => {
            spyOn(authManager, 'getToken').and.returnValue(void 0);

            expect(service.isLoggedIn()).toBe(false, 'should be false when token does not exists');
        });
    });

    describe('login', () => {
        const token = 'token';
        let api: HttpClient;
        let backend: MockBackend;
        let service: AuthService;
        let authManager: AuthManager;
        let response: Response;
        let logService: LogService;
        const testUser = UserBlueprint.default();

        beforeEach(inject(
            [HttpClient, LogService, AuthManager, MockBackend],
            (http: HttpClient, log: LogService, auth: AuthManager, be: MockBackend) => {
                backend = be;
                api = http;
                authManager = auth;
                logService = log;
                service = new AuthService(http, log, auth);
                const options = new ResponseOptions({status: 200, body: 'token'});
                response = new Response(options);
            }));

        it('should set token on success', async(() => {
            const spy = spyOn(authManager, 'setToken').and.returnValue(token);

            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.login(testUser)
                .do(status => {
                    expect(status).toEqual(true, 'should return login success');
                    expect(spy.calls.first().args[0]).toBe(token, 'should store getToken in localStorage');
                });
        }));

        it('should not set getToken if response status is not an OK status', async(() => {
            const spy = spyOn(localStorage, 'setItem');
            const resp = new Response(new ResponseOptions({status: 204}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

            service.login(testUser)
                .do(status => {
                    expect(status).toEqual(false, 'should return login success');
                    expect(spy.calls.any()).toBe(false, 'should not store getToken in localStorage');
                });
        }));

        it('should treat error as an Observable error', async(inject([], () => {
            const resp = new Response(new ResponseOptions({status: 500, body: {success: false}}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

            service.login(testUser)
                .do(() => {
                    fail('should not respond with success');
                })
                .catch(err => {
                    expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                    return Observable.of(void 0);
                })
            ;
        })));

        it('should log error', async(inject([], () => {
            const resp = new Response(new ResponseOptions({status: 500, body: {success: false}}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

            const spy = spyOn(logService, 'error');

            service.login(testUser)
                .subscribe(() => {
                }, () => {
                });

            expect(spy.calls.count()).toEqual(1);
        })));

        it('should call get on authorize url', async(() => {
            const spy = spyOn(api, 'get').and.callThrough();
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.login(testUser)
                .do(() => {
                    expect(spy.calls.any()).toBe(true, 'get http request should have been made');
                    expect(spy.calls.first().args[0])
                        .toContain(environment.tokenUrl, 'http request should have been made');
                });
        }));

        it('should add login auth header', async(() => {
            const spy = spyOn(api, 'get').and.callThrough();
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            const base64UserCredentials = `Basic ${btoa(testUser.getEmail() + ':' + testUser.getPassword())}`;

            service.login(testUser)
                .do(() => {
                    expect(spy.calls.any()).toBe(true, 'get http request should have been made');
                    const headers: Headers = spy.calls.first().args[1].headers;
                    expect(headers.has('Authorization')).toBe(true, 'authorization header should exist');
                    expect(headers.get('Authorization'))
                        .toBe(base64UserCredentials, 'authorization header value should be base64 creds');
                });
        }));
    });

    describe('Logout', () => {
        let authManagerStub: AuthManager;
        let service: AuthService;

        beforeEach(inject(
            [HttpClient, LogService, AuthManager, XHRBackend],
            (http: HttpClient, log: LogService, auth: AuthManager) => {
                authManagerStub = auth;
                service = new AuthService(http, log, auth);
            }));

        it('should call AuthManager.clear', () => {
            const spy = spyOn(authManagerStub, 'clear');

            service.logout();

            expect(spy.calls.count()).toBe(1, 'AuthManager.clear should be called');
        });
    });

});
