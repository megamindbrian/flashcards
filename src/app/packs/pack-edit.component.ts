import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../models/Card';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseListFactory } from '../core/database';
import { Pack } from '../models/Pack';
import { AngularFireDatabase } from 'angularfire2/database';
import { getRef } from 'angularfire2/database/utils';
import { NavigationEnd, Router } from '@angular/router';

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
    private pack: Pack;
    private cardsSub: Subscription;

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
            .subscribe(router => this.packIdFromUrl(this.router.url));

        this.sub = FirebaseListFactory<Pack>(getRef(this.database.app, '/pack'), Pack)
            .map((packs: Array<Pack>) => packs.filter(pack => pack.getId() === this.packId)[ 0 ])
            .subscribe(pack => {
                this.pack = pack;
                this.ref.detectChanges();
            });

        this.cardsSub = FirebaseListFactory<Card>(getRef(this.database.app, '/card'), Card)
            .map((cards: Array<Card>) => cards.filter(card => card.getPackId() === this.packId))
            .subscribe(cards => {
                this.cards = cards.filter(c => !c.getDeleted());
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
