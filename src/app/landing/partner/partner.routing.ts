import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerComponent } from './partner.component';

export const partnerRoutes: Routes = [
    {
        path: '',
        component: PartnerComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(partnerRoutes);
