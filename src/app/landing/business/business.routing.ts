import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';

export const businessRoutes: Routes = [
    {
        path: '',
        component: BusinessComponent,
        data: {roles: ['anonymous', 'user']}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(businessRoutes);
