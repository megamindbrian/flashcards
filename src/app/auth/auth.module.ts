import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';

import { routing } from './auth.routing';
import { COMMON_MODULES } from '../core/core.module';
import { DialogGuard } from '../core/dialog-guard';

export const COMPONENTS = [
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
];

@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    providers: [ DialogGuard ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class AuthModule {
}
