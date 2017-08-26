import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { routing } from './business.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ BusinessComponent ]
})
export class BusinessModule {
}
