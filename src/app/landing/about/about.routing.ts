import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export const aboutRoutes: Routes = [
    {
        path: '',
        component: AboutComponent,
        data: {roles: ['anonymous', 'user']}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(aboutRoutes);
