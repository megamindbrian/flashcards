import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyComponent } from './privacy.component';

export const privacyRoutes: Routes = [
    {
        path: '',
        component: PrivacyComponent,
        data: {roles: ['anonymous', 'user']}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(privacyRoutes);
