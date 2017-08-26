import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthManager {
    private tokenId = 'token';

    constructor(public helper: JwtHelper,
                public http: HttpClient) {
    }

    getToken(): string {
        return localStorage.getItem(this.tokenId);
    }

    getDecodedToken(): any {
        const token = JSON.parse(this.getToken());
        if (typeof token !== 'undefined' && token !== null) {
            return this.helper.decodeToken(token.access_token);
        } else {
            return void 0;
        }
    }

    tokenExpired(): boolean {
        const expires = false;
        const token = this.getDecodedToken();
        const now: any = new Date().getTime() / 1000;
        if (token && token.auth_time) {
            const expire: any = new Date(token.auth_time).getTime() + 3600;
            const expiresIn = expire - now;
            return expiresIn < 1;
        } else {
            return expires;
        }
    }

    getAuthorizationHeader(): Observable<HttpHeaders> {
        const headers = new HttpHeaders();
        const token = JSON.parse(this.getToken());
        if (typeof token !== 'undefined') {
            if (this.tokenExpired()) {
                return this.attemptRefresh()
                    .flatMap(() => {
                        headers.append('Authorization', 'Bearer ' + token.access_token);
                        return Observable.of(headers);
                    });
            } else {
                headers.append('Authorization', 'Bearer ' + token.access_token);
            }
        }

        return Observable.of(headers);
    }

    attemptRefresh(): Observable<boolean> {
        const headers = new HttpHeaders();
        headers.append('Authorization', `Basic ${btoa(`${environment.client_id}:${environment.client_secret}`)}`);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const refresh_token = JSON.parse(this.getToken()).refresh_token;
        const body = new URLSearchParams();
        const data: { [key: string]: any } = {
            scope: environment.scope,
            grant_type: environment.refresh_type,
            refresh_token
        };
        Object.keys(data).forEach(k => body.set(k, (data[ k ] || '').toString()));
        return this.http.post(
            environment.identityHost + environment.tokenUrl,
            body.toString(),
            {headers})
            .flatMap((res: HttpResponse<any>) => {
                this.setToken(res.body);
                return Observable.of(true);
            })
            .catch(error2 => Observable.of(false));
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenId, token);
    }

    clear(): void {
        localStorage.removeItem(this.tokenId);
    }
}
