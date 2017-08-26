import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupEditComponent } from './group-edit.component';
import { SubGroupsComponent } from './sub-groups.component';
import { PacksComponent } from './packs.component';
import { routing } from './groups.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ GroupsComponent, GroupEditComponent, SubGroupsComponent, PacksComponent ]
})
export class GroupsModule {
}
