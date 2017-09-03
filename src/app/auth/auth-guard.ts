import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';
import { User } from '../models/User';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    public user: User;
    sub: Subscription;
    subj: ReplaySubject<User>;

    static escapeEmail(email: string): string {
        return email.toLowerCase()
            .replace('.', '_').replace('$', '_')
            .replace('/', '_').replace('#', '_')
            .replace('[', '_').replace(']', '_');
    }

    constructor(public fireAuth: AngularFireAuth, public database: AngularFireDatabase) {
        this.subj = new ReplaySubject();
        this.fireAuth.auth.onAuthStateChanged((state: firebase.User | null) => {
            if (!state) {
                if (this.sub) {
                    this.sub.unsubscribe();
                }
                this.subj.next(void 0);
            } else {
                this.sub = database.object('/users/' + AuthGuard.escapeEmail(state.email))
                    .flatMap(user => {
                        return state && user && typeof user.oldKey !== 'undefined'
                            ? database.object('/users/' + user.oldKey).map(oldUser => {
                                const origUser = Object.assign({}, user);
                                return Object.assign({}, oldUser, origUser);
                            })
                            : Observable.of(user);
                    })
                    .subscribe(u => this.subj.next(u));
            }
        });
        this.subj.subscribe(u => {
            this.user = u;
        });
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
        const roles = (route.data[ 'roles' ] || route.parent.data[ 'roles' ]) as Array<string>;
        return this.subj.flatMap(() => this.user.getRoles())
            .map(r => this.user
                ? [ 'user' ].concat(r || [])
                : [ 'anonymous' ])
            .map((result: Array<string>) => typeof roles === 'undefined' || result
                .filter((r: string) => roles.indexOf(r) !== -1).length > 0);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }

}
