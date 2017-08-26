import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card.component';

export const cardsRoutes: Routes = [
    {
        path: ':card',
        component: CardComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    },
    {
        path: '',
        component: CardComponent,
        data: {roles: [ 'anonymous', 'user' ]}
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(cardsRoutes);
