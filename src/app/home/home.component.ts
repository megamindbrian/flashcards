import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Response } from '../models/Response';
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
    private responses: Array<Response>;

    constructor(public ref: ChangeDetectorRef,
                public database: AngularFireDatabase) {
    }

    ngOnInit(): void {
        // this.database.user('/user/0');
        this.sub = FirebaseObjectFactory<User>(getRef(this.database.app, '/user/0'), User)
        // TODO: move to User model?
            .flatMap((u: User) => u.getUserPacks()
                .combineLatest(u.getResponses(), (userPacks, responses) => ({userPacks, responses})))
            .flatMap(({userPacks, responses}: { userPacks: Array<UserPack>, responses: Array<Response> }) => {
                this.responses = responses;
                return Observable
                    .zip(...userPacks.map(userPack => userPack.getRetention(responses)
                        .map(retention => ({
                            retention: retention.filter(r => r.shouldDisplay),
                            up: userPack
                        }))));
            })
            .subscribe((ups: Array<{ retention: Array<RetentionValue>, up: UserPack }>) => {
                const r = ups.filter(retention => retention.retention.length > 0);
                this.userPacks = r.map(retention => retention.up);
                this.total = r.reduce((a, b) => a + b.retention.length, 0);
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (typeof this.sub !== 'undefined') {
            this.sub.unsubscribe();
        }
    }

}
