import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { SwitchUsersComponent } from './switch-users/switch-users.component';
import { PaymentComponent } from './payment/payment.component';
import { AccountComponent } from './account.component';
import { routing } from './account.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ ContactInformationComponent, SwitchUsersComponent, PaymentComponent, AccountComponent ]
})
export class AccountModule {
}
