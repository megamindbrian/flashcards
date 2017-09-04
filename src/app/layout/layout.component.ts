import { Component, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutService } from './layout.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/timer';

@Component({
    selector: 'bc-layout',
    templateUrl: './layout.component.html',
    styleUrls: [ './layout.component.scss' ]
})
export class LayoutComponent {
    scrolling = false;

    static getOffset(element: any, target: any) {
        const offset = {top: element.offsetTop, left: element.offsetLeft};
        let parent = element.offsetParent;
        while (parent != null && parent !== target) {
            offset.left += parent.offsetLeft;
            offset.top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return offset;
    }

    constructor(public router: Router, public layout: LayoutService) {
        this.router.events.filter(e => e instanceof NavigationEnd)
            .map(() => null)
            .merge(this.layout.focusElement)
            .debounce(() => Observable.timer(100))
            .subscribe((e) => this.onScrollTo(e));
    }

    onScrollTo(el: ElementRef | null) {
        // TODO: remove scrolling on page change?
        if (!el) {
            this.scrollTop(0);
        } else {
            const parent = window.document.getElementsByClassName('mat-sidenav-content')[ 0 ];
            const offset = LayoutComponent.getOffset(el.nativeElement, parent);
            this.scrollTop(offset.top);
        }
    }

    scrollTop(newTop: number = 0) {
        const el = window.document.getElementsByClassName('mat-sidenav-content')[ 0 ];
        if (typeof el === 'undefined' || this.scrolling) {
            return;
        }
        if (newTop < 0) {
            newTop = 0;
        }
        if (Math.round(el.scrollTop / 10) === Math.round(newTop / 10)) {
            return;
        }

        const start = el.scrollTop;
        const diff = newTop - start;
        const scrollStep = Math.PI / (500 / 10);
        let count = 0, currPos = start;

        this.scrolling = true;
        const scrollInterval = setInterval(() => {
            if (Math.round(el.scrollTop / 15) !== Math.round(newTop / 15) && currPos < el.scrollHeight) {
                count = count + 1;
                currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
                el.scrollTop = currPos;
            } else {
                this.scrolling = false;
                clearInterval(scrollInterval);
            }
        }, 10);
    }
}


