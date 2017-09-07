import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SummaryRowComponent } from './summary-row/summary-row.component';
import { routing } from './home.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ HomeComponent, SummaryRowComponent ],
    providers: []
})
export class HomeModule {
}
