import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {roles: ['anonymous', 'user']}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);
