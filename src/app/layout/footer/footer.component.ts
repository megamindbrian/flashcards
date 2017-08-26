import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'bc-footer',
    templateUrl: './footer.component.html',
    styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent {
    private year: number;

    constructor(public layout: LayoutService) {
        this.year = (new Date()).getFullYear();
    }
}
