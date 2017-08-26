import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SummaryComponent } from './summary/summary.component';
import { routing } from './home.routing';
import { HomeService } from './home.service';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ HomeComponent, SummaryComponent ],
    providers: [ HomeService ]
})
export class HomeModule {
}
