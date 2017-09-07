import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
    private actionCode: string | any;

    constructor(public router: Router,
                public fireAuth: AngularFireAuth,
                public route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.email = params[ 'email' ];
        });
        this.route.queryParams.subscribe(params => {
            this.code = params[ 'code' ];
            this.handleParams(params);
        });
    }

    handleParams(params: { [index: string]: any }): void {
        this.actionCode = params[ 'oobCode' ];
        switch (params[ 'mode' ]) {
            case 'resetPassword':
                // Display reset password handler and UI.
                this.handleResetPassword();
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                this.handleRecoverEmail();
                break;
            case 'verifyEmail':
                // Display email verification handler and UI.
                this.handleVerifyEmail();
                break;
            default:
            // Error: invalid mode.
        }
    }

    resetPassword(): void {
        this.fireAuth.auth.confirmPasswordReset(this.actionCode, this.password).then((resp: any) => {
            // Password reset has been confirmed and new password updated.

            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);

        });
    }

    private handleResetPassword(): void {
        // Verify the password reset code is valid.
        this.fireAuth.auth.verifyPasswordResetCode(this.actionCode).then((accountEmail: string) => {
            this.email = accountEmail;

            // TODO: Show the reset screen with the user's email and ask the user for
            // the new password.

            // Save the new password.
        }).catch(error => {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
        });
    }

    private handleRecoverEmail(): void {
        // Confirm the action code is valid.
        this.fireAuth.auth.checkActionCode(this.actionCode).then((info: any) => {
            // Get the restored email address.
            this.email = info[ 'data' ][ 'email' ];

            // Revert to the old email.
            return this.fireAuth.auth.applyActionCode(this.actionCode);
        });
    }

    private handleVerifyEmail(): void {
        // Try to apply the email verification code.
        this.fireAuth.auth.applyActionCode(this.actionCode).then((resp: any) => {
            // Email address has been verified.

            // TODO: Display a confirmation message to the user.
            // You could also provide the user with a link back to the app.
        });
    }
}
