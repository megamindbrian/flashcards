import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { routing } from './privacy.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ PrivacyComponent ]
})
export class PrivacyModule {
}
