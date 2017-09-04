import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RetentionValue, UserPack } from '../../models/UserPack';
import { Pack } from '../../models/Pack';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'bc-summary-row',
    templateUrl: './summary-row.component.html',
    styleUrls: [ './summary-row.component.scss' ]
})
export class SummaryRowComponent implements OnInit, OnDestroy {
    @Input() public userPack: UserPack;
    protected pack: Pack;
    private sub: Subscription;
    protected count: string;
    private countSub: Subscription;
    protected firstCard: number;
    private isNew: boolean;

    constructor(public ref: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.sub = this.userPack.getPack()
            .subscribe((pack: Pack) => {
                this.pack = pack;
                this.ref.detectChanges();
            });
        this.countSub = this.userPack.getRetention()
            .subscribe((retention: Array<RetentionValue>) => {
                this.isNew = retention.filter(r => typeof r.lastAnswered !== 'undefined').length === 0;
                this.count = retention.filter(r => r.shouldDisplay).length + '/' + retention.length;
                this.firstCard = retention.length > 0 ? retention[ 0 ].cardId : void 0;
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
        if (typeof this.countSub !== 'undefined') {
            this.countSub.unsubscribe();
        }
    }

}
