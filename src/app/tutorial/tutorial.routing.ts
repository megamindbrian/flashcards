import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial.component';

export const tutorialRoutes: Routes = [
    {
        path: '',
        component: TutorialComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(tutorialRoutes);
