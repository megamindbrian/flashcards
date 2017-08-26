import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { SwitchUsersComponent } from './switch-users/switch-users.component';
import { AccountComponent } from './account.component';

export const activityRoutes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: 'contact',
                component: ContactInformationComponent
            },
            {
                path: 'switch',
                component: SwitchUsersComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(activityRoutes);

