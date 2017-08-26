import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './auth/auth-guard';
import { DialogGuard } from './core/dialog-guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'account',
        canActivate: [ AuthGuard ],
        data: {roles: [ 'user' ]},
        loadChildren: './account/account.module#AccountModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'activity',
        loadChildren: './activity/activity.module#ActivityModule'
    },
    {
        path: 'cards',
        loadChildren: './cards/cards.module#CardsModule'
    },
    {
        path: 'packs',
        loadChildren: './packs/packs.module#PacksModule'
    },
    {
        path: 'emails',
        canActivate: [ AuthGuard ],
        loadChildren: './emails/emails.module#EmailsModule'
    },
    {
        path: 'groups',
        loadChildren: './groups/groups.module#GroupsModule'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'about',
        loadChildren: './landing/about/about.module#AboutModule'
    },
    {
        path: 'business',
        loadChildren: './landing/business/business.module#BusinessModule'
    },
    {
        path: 'contact',
        canActivate: [ DialogGuard ],
        loadChildren: './landing/contact/contact.module#ContactModule'
    },
    {
        path: 'parents',
        loadChildren: './landing/parents/parents.module#ParentsModule'
    },
    {
        path: 'partner',
        loadChildren: './landing/partner/partner.module#PartnerModule'
    },
    {
        path: 'privacy',
        loadChildren: './landing/privacy/privacy.module#PrivacyModule'
    },
    {
        path: 'students',
        loadChildren: './landing/students/students.module#StudentsModule'
    },
    {
        path: 'terms',
        loadChildren: './landing/terms/terms.module#TermsModule'
    },
    {
        path: 'store',
        loadChildren: './store/store.module#StoreModule'
    },
    {
        path: 'tutorial',
        loadChildren: './tutorial/tutorial.module#TutorialModule'
    },
    {
        path: 'command',
        loadChildren: './users/users.module#UsersModule'
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
