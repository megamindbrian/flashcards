import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthManager } from './auth.manager';
import { LogService } from '../core/log/log.service';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
    public loggedIn: ReplaySubject<boolean> = new ReplaySubject();

    static getLoginHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.append('Authorization', `Basic ${btoa(`${environment.client_id}:${environment.client_secret}`)}`);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    }

    static validatePassword(pass: string): void {
        if (pass.length < 8) {
            throw new Error('Password too short');
        }
        if (!(pass.match(/[a-z]/g) && pass.match(/[A-Z]/g))) {
            throw new Error('Password must contain and upper and lower case');
        }
        if (!(pass.match(/[0-9]/ig) || pass.match(/[^a-z]/ig))) {
            throw new Error('Password must contain a number or symbol');
        }
    }

    constructor(public http: HttpClient,
                public log: LogService,
                public authManager: AuthManager) {
        this.isLoggedIn();
    }

    isLoggedIn(): boolean {
        const loggedIn = !!this.authManager.getDecodedToken();
        this.loggedIn.next(loggedIn);
        return loggedIn;
    }

    login(user: User): Observable<boolean> {
        const headers = AuthService.getLoginHeaders();
        const body = new URLSearchParams();
        const data: { [key: string]: any } = {
            username: user.getEmail(),
            password: user.getPassword(),
            grant_type: environment.grant_type,
            scope: environment.scope
        };
        Object.keys(data).forEach(k => body.set(k, (data[k] || '').toString()));
        const req = new HttpRequest(
            'POST',
            environment.identityHost + environment.tokenUrl,
            body.toString(),
            {headers});
        return this.http.request(req)
            .map(res => this.extractToken(res as HttpResponse<any>))
            .catch(error => {
                this.log.error(error);
                return Observable.throw(error);
            });
    }

    logout(): void {
        this.authManager.clear();
        this.isLoggedIn();
    }

    forgotPassword(email: string): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders();
        return this.http.post(
            environment.identityHost + environment.forgotUrl,
            {
                email,
                callbackUrl: `${window.location.host}/auth/reset/${encodeURIComponent(email)}?code=\{code}`
            },
            {headers})
            .catch(error => {
                this.log.error(error);
                return Observable.throw(error);
            });
    }

    passwordReset(email: string,
                  code: string,
                  newPassword: string,
                  returnUrl: string = ''): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const body = new URLSearchParams();
        const data: { [key: string]: string } = {
            email,
            code,
            password: newPassword,
            callbackUrl: window.location.host + returnUrl
        };
        Object.keys(data).forEach(k => body.set(k, data[k].toString()));
        return this.http.post(
            environment.identityHost + environment.resetUrl,
            body.toString(),
            {headers})
            .catch(error => {
                this.log.error(error);
                return Observable.throw(error);
            });
    }

    register(user: User): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders();
        AuthService.validatePassword(user.getPassword());
        return this.http.post(
            environment.identityHost + environment.registerUrl,
            user,
            {headers})
            .catch(error => {
                this.log.error(error);
                return Observable.throw(error);
            });
    }

    private extractToken(res: HttpResponse<any>): boolean {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        const success = res.status === 200;

        if (success) {
            const token = res.body;
            this.authManager.setToken(token);
        }

        this.isLoggedIn();
        return success;
    }

}
