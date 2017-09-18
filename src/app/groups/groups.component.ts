import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AngularFireDatabase } from 'angularfire2/database';
import { getRef } from 'angularfire2/database/utils';
import { FirebaseObjectFactory } from '../core/database';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../models/Group';

@Component({
    selector: 'bc-groups',
    templateUrl: './groups.component.html',
    styleUrls: [ './groups.component.scss' ]
})
export class GroupsComponent implements OnInit {
    private sub: Subscription;
    private groups: Array<Group>;

    constructor(public ref: ChangeDetectorRef,
                public database: AngularFireDatabase) {
    }

    ngOnInit(): void {
        this.sub = FirebaseObjectFactory<User>(getRef(this.database.app, '/user/0'), User)
        // TODO: move to User model?
            .flatMap((u: User) => u.getGroups())
            .subscribe(groups => {
                this.groups = groups;
                this.ref.detectChanges();
            });

    }

}
