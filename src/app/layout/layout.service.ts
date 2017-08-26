import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class LayoutService {

    sidebarOpen: Observable<boolean>;
    focusElement: ReplaySubject<ElementRef | null> = new ReplaySubject();
    routeClass: ReplaySubject<string> = new ReplaySubject();

    static shouldUseSmallFooter(url: string): boolean {
        return url.indexOf('home') > -1
            && typeof url.split(/[\/#?]/ig)[ 2 ] !== 'undefined'
            && url.split(/[\/#?]/ig)[ 2 ] !== '';
    }

    constructor(public router: Router) {
        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe((e: NavigationEnd) => {
                let urlClass = e.url.split(/[\/#?]/ig)[ 1 ];
                if (typeof urlClass === 'undefined' || urlClass.trim() === '' || urlClass === null) {
                    urlClass = 'home';
                }
                const footerClass = LayoutService.shouldUseSmallFooter(this.router.url) ? ' funnel ' : '';
                this.routeClass.next(urlClass + ' ' + footerClass);
            });
    }
}
