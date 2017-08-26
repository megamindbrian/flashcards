import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial.component';
import { routing } from './tutorial.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ TutorialComponent ]
})
export class TutorialModule {
}
