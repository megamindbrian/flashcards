import { AuthManager } from './auth.manager';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthManager', () => {
    const tokenId = 'token';
    let manager: AuthManager;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                JwtHelper,
                {
                    provide: HttpClient,
                    useFactory: (backend: HttpHandler) => new HttpClient(backend),
                    deps: [MockBackend]
                },
                HttpHandler,
                BaseRequestOptions
            ]
        });
    });
    beforeEach(inject([JwtHelper, HttpClient], (helper: JwtHelper, http: HttpClient) => {
        manager = new AuthManager(helper, http);
    }));

    it('token should get jwt from localStorage', () => {
        const spy = spyOn(localStorage, 'getItem');

        manager.getToken();

        expect(spy.calls.any()).toBe(true, 'localStorage getItem should have been called');
        expect(spy.calls.first().args[0]).toBe(tokenId, 'getItem should have been called with tokenrId');
    });

    it('payload decodes the jwt', () => {
        const token = '{"access_token": "token"}';
        spyOn(localStorage, 'getItem').and.returnValue(token);

        const spy = spyOn(manager.helper, 'decodeToken').and.returnValue('tokenPayload');

        manager.getDecodedToken();

        expect(spy.calls.any()).toBe(true, 'decode should have been called');
        expect(spy.calls.first().args[0])
            .toBe(JSON.parse(token).access_token, 'decode should have been called with: ' + token);
    });

    describe('headers', () => {
        const token = '{"access_token": "dG9rZW4=.e30=.M3BhcnRz"}';
        const authorization = 'Bearer ' + JSON.parse(token).access_token;

        it('headers should return the Authorization header with Bearer token', () => {
            spyOn(localStorage, 'getItem').and.returnValue(token);
            manager.getAuthorizationHeader().subscribe(headers => {
                expect(headers.has('Authorization')).toBe(true, 'Authorization header should exist');
                expect(headers.get('Authorization'))
                    .toBe(authorization, 'Authorization header should be: ' + authorization);
            });
        });
    });

    it('setToken should set token in localStorage', () => {
        const token = 'token';
        const spy = spyOn(localStorage, 'setItem');

        manager.setToken(token);

        expect(spy.calls.any()).toBe(true, 'setToken should have been called');
        expect(spy.calls.first().args[0]).toBe(tokenId, 'setToken should have been called with tokenId: ' + token);
        expect(spy.calls.first().args[1]).toBe(token, 'setToken should have been called with: ' + token);
    });

    describe('clear', () => {
        it('should remove token in localStorage', () => {
            const spy = spyOn(localStorage, 'removeItem');

            manager.clear();

            expect(spy.calls.count()).toBe(1, 'removeItem should have been called once');
            expect(spy.calls.first().args[0]).toBe(tokenId, 'setToken should have been called with: ' + tokenId);
        });
    });

    it('tokenExpired should be true after an hour', () => {
        const token = '{"access_token": "token"}';
        spyOn(localStorage, 'getItem').and.returnValue(token);

        const token_time = new Date();
        token_time.setHours((new Date()).getHours() - 2);
        const spy = spyOn(manager.helper, 'decodeToken').and.returnValue({auth_time: token_time.getTime() / 1000});

        expect(manager.tokenExpired()).toBeTruthy();
        expect(spy.calls.any()).toBe(true, 'decode should have been called');
    });

    it('tokenExpired should not be true before an hour', () => {
        const token = '{"access_token": "token"}';
        spyOn(localStorage, 'getItem').and.returnValue(token);

        const token_time = new Date();
        const spy = spyOn(manager.helper, 'decodeToken').and.returnValue({auth_time: token_time.getTime() / 1000});

        expect(manager.tokenExpired()).toBeFalsy();
        expect(spy.calls.any()).toBe(true, 'decode should have been called');
    });
});
