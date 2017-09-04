import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'bc-account-links',
    templateUrl: './account-links.component.html'
})
export class AccountLinksComponent implements AfterViewInit {

    public loggedIn: boolean;

    constructor(public ref: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
    }
}
