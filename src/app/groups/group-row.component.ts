import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../models/Group';

@Component({
    selector: 'bc-group-row',
    templateUrl: './group-row.component.html',
    styleUrls: [ './group-row.component.scss' ]
})
export class GroupRowComponent implements OnInit, OnDestroy {
    @Input() public group: Group;
    private sub: Subscription;
    private logo = '/assets/upload_image.png';
    private groups: Array<Group>;

    constructor(public ref: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.sub = this.group.getLogo()
        // TODO: make Cards static, takes too long to build index
            .combineLatest(this.group.getGroups(), (file: string, all: Array<Group>) => ({file, all}))
            .subscribe(({file, all}: ({ file: string, all: Array<Group> })) => {
                this.logo = file || '/assets/upload_image.png';
                this.groups = all.filter(c => !c.getDeleted());
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
    }

}
