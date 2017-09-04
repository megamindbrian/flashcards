import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AngularFireDatabase } from 'angularfire2/database';
import { getRef } from 'angularfire2/database/utils';
import { FirebaseObjectFactory } from '../core/database';
import { RetentionValue, UserPack } from '../models/UserPack';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/zip';

@Component({
    selector: 'bc-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy {
    public userPacks: Array<UserPack>;
    private sub: Subscription;
    private total: number;

    constructor(public ref: ChangeDetectorRef,
                public database: AngularFireDatabase) {
    }

    ngOnInit(): void {
        this.sub = FirebaseObjectFactory<User>(getRef(this.database.app, '/user/0'), User)
            .flatMap((u: User) => u.getUserPacks())
            .flatMap(ups => Observable
                .zip(...ups.map(up => up.getRetention()
                    .map(retention => ({retention: retention.filter(r => r.shouldDisplay), up})))))
            .map((r: Array<{ retention: Array<RetentionValue>, up: UserPack }>) => r
                .filter(retention => retention.retention.length > 0))
            .map((r: Array<{ retention: Array<RetentionValue>, up: UserPack }>) => ({
                ups: r.map(retention => retention.up),
                total: r.reduce((a, b) => a + b.retention.length, 0)
            }))
            .subscribe(({ups, total}: { ups: Array<UserPack>, total: number }) => {
                this.userPacks = ups;
                this.total = total;
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
    }

}
