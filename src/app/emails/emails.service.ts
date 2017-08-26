import { Injectable } from '@angular/core';
import { Mail } from '../models/Mail';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseListFactory } from '../core/database';
import { getRef } from 'angularfire2/database/utils';
import * as firebase from 'firebase/app';

@Injectable()
export class EmailsService {
    public list: FirebaseListObservable<Array<Mail>>;

    constructor(public database: AngularFireDatabase) {
        this.list = FirebaseListFactory<Mail>(
            getRef(this.database.app, 'mail'),
            (ref: firebase.database.Reference, exists: boolean, key: string) => new Mail(ref, exists, key));
    }

}
