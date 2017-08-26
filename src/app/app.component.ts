import 'rxjs/add/operator/let';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from './layout/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

@Component({
    selector: 'bc-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ TranslateService, LayoutService ],
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
    private firstNavigation = true;

    constructor(public layout: LayoutService,
                public dialog: MdDialog,
                public router: Router) {
        /**
         * Selectors can be applied with the `select` operator which passes the state
         * tree to the provided selector
         */
    }

    ngOnInit(): void {
        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe((e: NavigationEnd) => {
                // to prevent from accidentally closing the dialog if that is where they navigate to directly.
                if (!this.firstNavigation) {
                    this.dialog.closeAll();
                }
                this.firstNavigation = false;
                if (typeof (window as any).ga !== 'undefined') {
                    (window as any).ga('set', 'page', e.urlAfterRedirects);
                    (window as any).ga('send', 'pageview');
                }
            });
    }

}
