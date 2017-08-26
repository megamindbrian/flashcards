import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserPack } from '../models/UserPack';
import { User } from '../models/User';
import { AngularFireDatabase } from 'angularfire2/database';
import { getRef } from 'angularfire2/database/utils';
import { FirebaseListFactory, FirebaseObjectFactory } from '../core/database';
import * as firebase from 'firebase/app';

interface UserPackUserReturnValue extends Array<Observable<{ up: UserPack, user_pack_user: User }>> {
}

@Injectable()
export class HomeService {
    public summary: Observable<Array<UserPack>>;

    private static userPacksToUsers(user_pack: Array<UserPack>): UserPackUserReturnValue {
        return user_pack
            .map((up: UserPack) => {
                return up.getUser()
                    .map((user_pack_user: User) => {
                        console.log(user_pack_user);
                        return ({up, user_pack_user});
                    });
            });
    }

    private static userPacksAndUser(user_pack: Array<UserPack>, user: User): Observable<Array<UserPack>> {
        return Observable.merge(...HomeService.userPacksToUsers(user_pack))
            .toArray()
            .map(ups => {
                console.log(ups);
                return ups
                    .filter(({up, user_pack_user}) => {
                        console.log(user_pack_user.getKey());
                        return user_pack_user.getKey() === user.getKey();
                    })
                    .map(({up}) => up);
            });
    }

    constructor(public database: AngularFireDatabase) {
        // TODO: move this to auth service
        const currentUser = FirebaseObjectFactory<User>(
            getRef(this.database.app, '/user/0'),
            (ref: firebase.database.Reference, exists: boolean, key: string) => new User(ref, exists, key));

        this.summary = FirebaseListFactory<UserPack>(
            getRef(this.database.app, '/user_pack'),
            (ref: firebase.database.Reference, exists: boolean, key: string) => new UserPack(ref, exists, key))
            .combineLatest(currentUser, (user_pack: Array<UserPack>, user: User) => ({user_pack, user}))
            // TODO: get more by using a combineLatest on on upu
            .flatMap(({user_pack, user}) => HomeService.userPacksAndUser(user_pack, user));
    }

}
