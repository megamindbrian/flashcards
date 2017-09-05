import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacksComponent } from './packs.component';
import { PackEditComponent } from './pack-edit.component';

export const packsRoutes: Routes = [
    {
        path: ':pack',
        component: PackEditComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    },
    {
        path: '',
        component: PacksComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(packsRoutes);
