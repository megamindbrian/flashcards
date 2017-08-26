import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmailsService } from './emails.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'bc-emails',
    templateUrl: './emails.component.html',
    styleUrls: [ './emails.component.scss' ]
})
export class EmailsComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    constructor(public emails: EmailsService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
