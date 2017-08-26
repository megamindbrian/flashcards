import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';

export const groupsRoutes: Routes = [
    {
        path: '',
        component: GroupsComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(groupsRoutes);
