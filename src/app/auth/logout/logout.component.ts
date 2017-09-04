import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bc-logout',
    template: ''
})
export class LogoutComponent implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit(): void {
        this.router.navigate([ '/' ], {replaceUrl: true});
    }

}
