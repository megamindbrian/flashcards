import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/Card';
import { Answer } from '../../models/Answer';

@Component({
    selector: 'bc-card-edit',
    templateUrl: './card-edit.component.html',
    styleUrls: [ './card-edit.component.scss' ]
})
export class CardEditComponent implements OnInit {

    public correct: Answer;
    @Input() answers: Array<Answer>;
    @Input() card: Card;
    @Input() index: number;
    @Input() readonly = false;

    constructor() {
    }

    ngOnInit(): void {
        this.correct = this.answers.filter(a => a.getCorrect())[ 0 ];
    }

    public getAnswersPlainText() {

    }

    public setAnswersPlainText() {

    }

}
