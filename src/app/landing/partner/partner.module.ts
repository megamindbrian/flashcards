import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner.component';
import { routing } from './partner.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ PartnerComponent ]
})
export class PartnerModule {
}
