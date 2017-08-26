import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailsComponent } from './emails.component';

export const emailsRoutes: Routes = [
    {
        path: '',
        component: EmailsComponent,
        data: {roles: ['anonymous', 'user']}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(emailsRoutes);
