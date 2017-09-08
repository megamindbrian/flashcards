import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../models/Card';
import { Subscription } from 'rxjs/Subscription';
import { Pack } from '../models/Pack';
import { AngularFireDatabase, FirebaseListFactory } from 'angularfire2/database';
import { getRef } from 'angularfire2/database/utils';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/operator/debounce';

@Component({
    selector: 'bc-pack-edit',
    templateUrl: './pack-edit.component.html',
    styleUrls: [ './pack-edit.component.scss' ]
})
export class PackEditComponent implements OnInit, OnDestroy {
    public cards: Array<Card>;
    private sub: Subscription;
    private routerSub: Subscription;
    private packId: number;
    public pack: Pack;
    private cardsSub: Subscription;

    constructor(public ref: ChangeDetectorRef,
                public router: Router,
                public database: AngularFireDatabase) {
        this.packIdFromUrl(this.router.url);

        this.routerSub = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe(() => this.packIdFromUrl(this.router.url));

        this.sub = FirebaseListFactory(getRef(this.database.app, '/pack'))
            .map((packs: Array<any>) => packs.filter(pack => pack.id === this.packId)[ 0 ])
            .flatMap((pack: Pack) => FirebaseListFactory(getRef(this.database.app, '/card'))
                .map((cards: Array<any>) => ({
                    cards: cards
                        .filter(card => {
                            return (card.pack_id + '' === this.packId + '')
                                && card.deleted
                                !== 1
                                && card.deleted
                                !== 'true';
                        }),
                    pack
                })))
            .subscribe(({pack, cards}: { pack: Pack, cards: Array<any> }) => {
                this.pack = pack;
                console.log(cards.length);
                this.cards = cards;
                this.ref.detectChanges();
            });
    }

    private packIdFromUrl(url: string): void {
        this.packId = parseInt(url.split('/')[ 2 ]);
    }

    ngOnInit(): void {

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
