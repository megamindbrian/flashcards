import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'bc-account-links',
    templateUrl: './account-links.component.html'
})
export class AccountLinksComponent implements AfterViewInit {

    public loggedIn: boolean;

    constructor(public authService: AuthService,
                public ref: ChangeDetectorRef) {
        this.authService.isLoggedIn();
    }

    ngAfterViewInit() {
        this.authService.loggedIn.subscribe((v) => {
            this.loggedIn = v;
            this.ref.detectChanges();
        });
    }
}
