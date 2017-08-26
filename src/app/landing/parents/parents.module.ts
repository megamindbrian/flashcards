import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsComponent } from './parents.component';
import { routing } from './parents.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ ParentsComponent ]
})
export class ParentsModule {
}
