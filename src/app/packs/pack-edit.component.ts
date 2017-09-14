import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../models/Card';
import { Subscription } from 'rxjs/Subscription';
import { Pack } from '../models/Pack';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/operator/debounce';
import { DbIdObject } from '../models/DbIdObject';
import { Observable } from 'rxjs/Observable';
import { Answer } from '../models/Answer';

@Component({
    selector: 'bc-pack-edit',
    templateUrl: './pack-edit.component.html',
    styleUrls: [ './pack-edit.component.scss' ]
})
export class PackEditComponent implements OnInit, OnDestroy {
    public cards: Array<{ card: Card, answers: Array<Answer> }>;
    private sub: Subscription;
    private routerSub: Subscription;
    private packId: number;
    public pack: Pack;
    private cardsSub: Subscription;
    public readonly = true;

    constructor(public ref: ChangeDetectorRef,
                public router: Router,
                public database: AngularFireDatabase) {
    }

    private packIdFromUrl(url: string): void {
        this.packId = parseInt(url.split('/')[ 2 ]);
    }

    ngOnInit(): void {
        this.packIdFromUrl(this.router.url);

        this.routerSub = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe(() => this.packIdFromUrl(this.router.url));

        this.sub = DbIdObject.list(this.database.database.ref('/pack'), Pack)
            .map((packs: Array<any>) => packs.filter(pack => pack.id + '' === this.packId + '')[ 0 ])
            .flatMap((pack: Pack) => pack.getCards()
                .flatMap((cards: Array<Card>) => Observable.zip(...cards
                    .filter((card: Card) => !card.getDeleted())
                    .map(card => card.getAnswers()
                        .map((answers: Array<Answer>) => ({answers, card})))))
                .map((cards: Array<{ card: Card, answers: Array<Answer> }>) => ({
                    pack,
                    cards
                })))
            .subscribe(({pack, cards}: { pack: Pack, cards: Array<any> }) => {
                this.pack = pack;
                this.cards = cards;
                console.log(cards);
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.routerSub !== 'undefined') {
            this.routerSub.unsubscribe();
        }
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
        if (typeof this.cardsSub !== 'undefined') {
            this.cardsSub.unsubscribe();
        }
    }

}
