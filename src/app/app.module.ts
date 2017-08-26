import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// sub-modules for lazy loading
import { LayoutModule } from './layout/layout.module';

// routing
import { routing } from './app.routing';
import { SharedModule, sharedModules } from './core/core.module';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const FirebaseConfig = {
    apiKey: 'AIzaSyDYgXu8zsmdigQcE49b_9BwS4z3TJVM15g',
    authDomain: 'studysauce-21943.firebaseapp.com',
    databaseURL: 'https://studysauce-21943.firebaseio.com',
    projectId: 'studysauce-21943',
    storageBucket: 'studysauce-21943.appspot.com',
    messagingSenderId: '597400204797'
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        ...sharedModules,

        AngularFireModule.initializeApp(FirebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,

        routing, // the rest of the modules are lazy-loaded
        LayoutModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {

}
