import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { routing } from './activity.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ ActivityComponent ]
})
export class ActivityModule {
}
