import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SupportMenuComponent } from './support/support.component';
import { AccountLinksComponent } from './account-links/account-links.component';
import { LanguageMenuComponent } from './language/language.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { COMMON_MODULES } from '../core/core.module';
import { NotFoundComponent } from './not-found/not-found.component';

export const COMPONENTS = [
    LayoutComponent,
    ToolbarComponent,
    FooterComponent,
    SupportMenuComponent,
    LanguageMenuComponent,
    AccountLinksComponent,
    MenuComponent,
    NotFoundComponent
];

@NgModule({
    imports: [
        ...COMMON_MODULES
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class LayoutModule {
}


