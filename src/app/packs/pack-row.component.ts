import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Pack } from '../models/Pack';
import { Card } from '../models/Card';

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

    constructor(public ref: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.sub = this.pack.getLogo()
        // TODO: make Cards static, takes too long to build index
            .combineLatest(this.pack.getCards(), (file: string, all: Array<Card>) => ({file, all}))
            .subscribe(({file, all}: ({ file: string, all: Array<Card> })) => {
                this.logo = file || '/assets/upload_image.png';
                const cards = all.filter(c => !c.getDeleted());
                this.cardCount = cards.length;
                this.firstCard = cards.length > 0
                    ? cards[ 0 ].getId()
                    : void 0;
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
    }

}
