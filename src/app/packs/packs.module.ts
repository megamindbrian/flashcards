import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacksComponent } from './packs.component';
import { ResultComponent } from './result/result.component';
import { PackEditComponent } from './pack-edit.component';
import { SubGroupsComponent } from './sub-groups.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { routing } from './packs.routing';
import { PackRowComponent } from './pack-row.component';
import { COMMON_MODULES } from '../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        ...COMMON_MODULES,
        routing
    ],
    declarations: [
        PacksComponent,
        PackRowComponent,
        ResultComponent,
        PackEditComponent,
        SubGroupsComponent,
        CardEditComponent
    ]
})
export class PacksModule {
}
