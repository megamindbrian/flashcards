import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { getRef } from 'angularfire2/database/utils';
import { FirebaseObjectFactory } from '../core/database';
import { Subscription } from 'rxjs/Subscription';
import { Pack } from '../models/Pack';
import { User } from '../models/User';

@Component({
    selector: 'bc-packs',
    templateUrl: './packs.component.html',
    styleUrls: [ './packs.component.scss' ]
})
export class PacksComponent implements OnInit, OnDestroy {
    private packs: Array<Pack>;
    private sub: Subscription;

    constructor(public ref: ChangeDetectorRef,
                public database: AngularFireDatabase) {
    }

    ngOnInit(): void {
        this.sub = FirebaseObjectFactory<User>(getRef(this.database.app, '/user/0'), User)
        // TODO: move to User model?
            .flatMap((u: User) => u.getAllPacks())
            .subscribe((packs: Array<Pack>) => {
                this.packs = packs;
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
    }

}
