import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { routing } from './students.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ StudentsComponent ]
})
export class StudentsModule {
}
