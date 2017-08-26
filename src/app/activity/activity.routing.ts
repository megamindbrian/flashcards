import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';

export const activityRoutes: Routes = [
    {
        path: '',
        component: ActivityComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(activityRoutes);

