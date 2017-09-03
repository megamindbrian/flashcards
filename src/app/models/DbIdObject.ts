// expose database so objects maintain their own reference code
import { DatabaseReference } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseListFactory } from 'angularfire2/database';

export abstract class DbIdObject<T> {

    // TODO: move ORM mapping login to unwrapper function?
    constructor(public $ref: DatabaseReference,
                public $exists: boolean,
                public $key: string) {
    }

    /**
     * Get $key
     *
     * @return string
     */
    public getKey(): string {
        return this.$key;
    }

    protected add<R extends DbIdObject<R>>(path: string, data: R): Observable<this> {
        return FirebaseListFactory(this.$ref.child(path))
            .flatMap(r => r.push(data.getKey()))
            .map(() => this);

    }

    protected remove<R extends DbIdObject<R>>(path: string, data: R): Observable<this> {
        const list = FirebaseListFactory(this.$ref.child(path));
        return list
            .flatMap(r => list.$ref.ref.child(r.indexOf(data.getKey())).remove())
            .map(() => this);

    }

    protected list<R extends DbIdObject<R>>(path: string,
                                            factory: (ref: firebase.database.Reference) =>
                                                Observable<R>): Observable<Array<R>> {
        const list = FirebaseListFactory(this.$ref.child(path));
        return list
            .flatMap((r: Array<string>) =>
                Observable.merge(r.map((rid: string) =>
                    factory(list.$ref.ref.root.child(path.replace(/s$/i, '')).child(rid)))))
            .toArray()
            .map((r: Array<any>) => r.map((result: any) => result as R));
    }
}
