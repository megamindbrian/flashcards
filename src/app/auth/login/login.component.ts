import 'rxjs/add/operator/let';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { MD_DIALOG_DATA, MdDialog } from '@angular/material';
import { AuthManager } from '../auth.manager';
import { User } from '../../models/User';

@Component({
    selector: 'bc-login-page',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements AfterViewInit {
    public message: string;
    public isLogin = false;
    public isRegister = false;
    public user: User;
    redirectUrl: string;

    constructor(public router: Router,
                public ref: ChangeDetectorRef,
                public dialog: MdDialog,
                public auth: AuthService,
                public authManager: AuthManager,
                @Optional() @Inject(MD_DIALOG_DATA) public data?: any) {
        if (this.router.url.indexOf('register') > -1) {
            this.isRegister = true;
            this.isLogin = false;
        } else {
            this.isRegister = false;
            this.isLogin = true;
        }
    }

    ngAfterViewInit(): void {
        if (this.router.url.indexOf('forgot') > -1) {
            this.communicateError('FORGOT');
        }
        if (this.router.url.indexOf('redirectUrl') > -1) {
            this.redirectUrl = decodeURIComponent(this.router.url.substr(this.router.url.indexOf('redirectUrl')
                + 'redirectUrl='.length));
        }
    }

    onRegister(): void {
        delete this.message;
        this.ref.detectChanges();
        if (this.user.getFirstName() === '' || this.user.getLastName() === ''
            || this.user.getEmail() === '' || this.user.getPassword() === '') {
            this.communicateError('INCOMPLETE');
            return;
        }
        this.auth.register(this.user)
            .flatMap(() => this.auth.login(this.user))
            .catch(e => {
                this.communicateError('REGISTERERROR');
                return Observable.throw(e);
            })
            .subscribe(response => {
                if (response) {
                    this.dialog.closeAll();
                    if (typeof this.redirectUrl !== 'undefined') {
                        this.router.navigate([ this.redirectUrl ]);
                    } else {
                        this.router.navigate([ '/' ]);
                    }
                }
            }, err => {
                if (typeof err.json === 'function'
                    && typeof err.json().is_valid !== 'undefined' && !err.json().is_valid) {
                    this.communicateError('EMAIL');
                } else if (typeof err.json === 'function'
                    && err.json().Message.match('already')) {
                    this.communicateError('ALREADYREGISTERED');
                    this.router.navigate([ 'login' ]);
                } else if (('' + err).indexOf('Password') > -1) {
                    this.communicateError('PASSWORD');
                } else {
                    this.communicateError('REGISTERERROR');
                }
            });
    }

    onLogin(): void {
        delete this.message;
        this.ref.detectChanges();
        if (this.user.getEmail() === '' || this.user.getPassword() === '') {
            this.communicateError('INCOMPLETE');
            return;
        }
        this.auth.login(this.user)
            .subscribe(isSuccess => {
                if (isSuccess) {
                    this.dialog.closeAll();
                    if (typeof this.redirectUrl !== 'undefined') {
                        this.router.navigate([ this.redirectUrl ]);
                    } else {
                        this.router.navigate([ '/' ]);
                    }
                }
            }, err => {
                if (typeof err.json() !== 'undefined'
                    && err.json().error.indexOf('invalid_grant')) {
                    this.communicateError('INCORRECT');
                } else {
                    this.communicateError('ERROR');
                }
            });
    }

    private communicateError(msg: string): void {
        this.message = msg;
        this.ref.detectChanges();
    }

}
