import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/Card';

@Component({
    selector: 'bc-card-edit',
    templateUrl: './card-edit.component.html',
    styleUrls: [ './card-edit.component.scss' ]
})
export class CardEditComponent implements OnInit {

    @Input() card: Card;
    @Input() index: number;

    constructor() {
    }

    ngOnInit(): void {
    }

}
