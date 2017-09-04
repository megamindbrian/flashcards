import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bc-forgot',
    templateUrl: './forgot-password.component.html',
    styleUrls: [ './forgot-password.component.scss' ]
})
export class ForgotPasswordComponent {
    email: string;
    error = '';

    constructor(public router: Router) {
    }

    onNext() {
        if (this.email === '') {
            return;
        }
    }

}

