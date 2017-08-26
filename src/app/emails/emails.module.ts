import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailsComponent } from './emails.component';
import { ImportComponent } from './import/import.component';
import { RecentComponent } from './recent/recent.component';
import { routing } from './emails.routing';
import { EmailsService } from './emails.service';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [EmailsComponent, ImportComponent, RecentComponent],
    providers: [EmailsService]
})
export class EmailsModule {
}
