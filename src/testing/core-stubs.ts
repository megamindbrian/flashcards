import { BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SharedModule, sharedModules } from '../app/core/core.module';
import { LayoutModule } from '../app/layout/layout.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformModule } from '@angular/cdk';
import { LogServiceStub } from './log-stubs';
import { LogService } from '../app/core/log/log.service';
import { AuthGuard } from '../app/auth/auth-guard';
import { LayoutService } from '../app/layout/layout.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

export const testingPlatformModules: Array<any> = [
    PlatformModule,
    BrowserModule,
    NoopAnimationsModule,
    RouterTestingModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateFakeLoader(),
            deps: [ HttpClient ]
        }
    }),
    LayoutModule,
    ...sharedModules,
    SharedModule.forRoot()
];

export const httpTestingProviders: Array<any> = [
    {
        provide: HttpClient,
        useFactory: (backend: HttpHandler) => new HttpClient(backend),
        deps: [ MockBackend ]
    },
    MockBackend,
    BaseRequestOptions
];

export const authTestingProviders: Array<any> = [
    LayoutService,
    AuthGuard,
    ...httpTestingProviders,
    {provide: LogService, useClass: LogServiceStub}
];

export const catalogTestingProviders: Array<any> = [
    LayoutService,
    ...httpTestingProviders,
    {provide: LogService, useClass: LogServiceStub}
];
