import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './terms.component';

export const termsRoutes: Routes = [
    {
        path: '',
        component: TermsComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(termsRoutes);
