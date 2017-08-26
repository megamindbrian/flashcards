import { Component, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'bc-language',
    templateUrl: './language.component.html'
})
export class LanguageMenuComponent {
    langs: Array<string>;

    constructor(private ref: ChangeDetectorRef, public translate: TranslateService) {
        this.translate.addLangs(environment.supportedLanguages);
        this.translate.setDefaultLang('en');
        this.langs = this.translate.getLangs();
        this.translate.use(this.translate.currentLang || 'en');
    }

    changeLanguage(lang: string) {
        this.translate.use(lang.match(/en|fr|tr/) ? lang : 'en');
        this.ref.detectChanges();
    }

}
