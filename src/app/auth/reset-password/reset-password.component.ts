import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bc-reset',
    templateUrl: './reset-password.component.html',
    styleUrls: [ './reset-password.component.scss' ]
})
export class ResetPasswordComponent {

    verificationCode: string;
    email: string;
    password: string;
    code: string;
    error = '';

    constructor(public router: Router,
                public route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.email = params[ 'email' ];
        });
        this.route.queryParams.subscribe(params => {
            this.code = params[ 'code' ];
        });
    }

    onNext() {
    }

}
