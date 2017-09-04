import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule,
    MdMenuModule,
    MdOptionModule, MdProgressSpinnerModule, MdSelectionModule, MdSelectModule,
    MdSidenavModule,
    MdToolbarModule, MdTooltipModule, OverlayModule,
    PlatformModule
} from '@angular/material';
import { AuthGuard } from '../auth/auth-guard';
import { RegisterFormComponent } from '../auth/register-form/register-form.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogGuard } from './dialog-guard';
import { JwtHelper } from 'angular2-jwt';
import { LogService } from './log/log.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// this is from MaterialModule which is deprecated
export const materialModules: Array<any> = [
    PlatformModule,
    OverlayModule,
    MdInputModule,
    MdOptionModule,
    MdButtonModule,
    MdSelectModule,
    MdSelectionModule,
    MdCardModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdCheckboxModule,
    MdMenuModule,
    MdTooltipModule,
    MdDialogModule,
    MdProgressSpinnerModule
];

export const sharedModules: Array<any> = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    HttpClientModule,
    ...materialModules
];

export function HttpClientLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const SHARED_COMPONENTS: Array<any> = [
    RegisterFormComponent
];

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpClientLoaderFactory,
                deps: [ HttpClient ]
            }
        }),
        ...sharedModules
    ],
    declarations: SHARED_COMPONENTS,
    exports: SHARED_COMPONENTS
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                DialogGuard,
                AuthGuard,
                JwtHelper,
                LogService,
                HttpClient
            ]
        };
    }
}

export const COMMON_MODULES = [
    ...sharedModules,
    SharedModule
];
