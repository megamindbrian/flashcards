import 'rxjs/add/operator/let';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog } from '@angular/material';
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

    }

    onLogin(): void {

    }

    private communicateError(msg: string): void {
        this.message = msg;
        this.ref.detectChanges();
    }

}
