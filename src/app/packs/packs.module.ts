import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacksComponent } from './packs.component';
import { ResultComponent } from './result/result.component';
import { PackEditComponent } from './pack-edit.component';
import { SubGroupsComponent } from './sub-groups.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { routing } from './packs.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ PacksComponent, ResultComponent, PackEditComponent, SubGroupsComponent, CardEditComponent ]
})
export class PacksModule {
}
