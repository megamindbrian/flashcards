import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
    selector: 'bc-forgot',
    templateUrl: './forgot-password.component.html',
    styleUrls: [ './forgot-password.component.scss' ]
})
export class ForgotPasswordComponent {
    email: string;
    error = '';
    private firebase: firebase.app.App;

    constructor(public router: Router) {
        this.firebase = firebase.app();
    }

    onNext(): void {
        const authx = this.firebase.auth();
        authx.sendPasswordResetEmail(this.email)
            .then(() => {
                alert(' Email sent');
            }, error => {
                alert(error);
            });
    }

}
