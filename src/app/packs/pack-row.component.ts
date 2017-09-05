import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Pack } from '../models/Pack';

@Component({
    selector: 'bc-pack-row',
    templateUrl: './pack-row.component.html',
    styleUrls: [ './pack-row.component.scss' ]
})
export class PackRowComponent implements OnInit, OnDestroy {
    @Input() public pack: Pack;
    private sub: Subscription;
    protected cardCount: number;
    protected firstCard: number;
    private logo: string;
    private logoSub: Subscription;

    constructor(public ref: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.sub = this.pack.getCards()
            .map(cards => ({firstCard: cards.length > 0 ? cards[ 0 ].getId() : void 0, count: cards.length}))
            .subscribe(({firstCard, count}: { count: number, firstCard: number }) => {
                this.cardCount = count;
                this.firstCard = firstCard;
                this.ref.detectChanges();
            });
        this.logoSub = this.pack.getLogo()
            .subscribe((logo: string) => {
                this.logo = logo;
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
        if (typeof this.logoSub !== 'undefined') {
            this.logoSub.unsubscribe();
        }
    }

}
