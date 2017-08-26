import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { routing } from './terms.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ TermsComponent ]
})
export class TermsModule {
}
