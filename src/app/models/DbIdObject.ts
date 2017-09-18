// expose database so objects maintain their own reference code
import { DatabaseReference } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { FirebaseListFactory as FireListFactory } from 'angularfire2/database';
import { FirebaseListFactory, FirebaseObjectFactory } from '../core/database';
import * as firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class DbIdObject {
    static subscriptions: {
        [index: string]: Observable<Array<any>>;
    } = {};
    static REBUILD_INDEX = false;
    protected created: Date | string;
    protected id: number | string;

    public file_id?: number | string;
    public group_id?: number | string;
    public bundle_id?: number | string;
    public user_id?: number | string;
    public pack_id?: number | string;
    public answer_id?: number | string;
    public response_id?: number | string;
    public payment_id?: number | string;
    public invitee_id?: number | string;
    public invite_id?: number | string;
    public visit_id?: number | string;
    public card_id?: number | string;
    public session_id?: string;

    public static list<R extends DbIdObject>(root: firebase.database.Reference, type: any): Observable<Array<R>> {
        if (typeof DbIdObject.subscriptions[ root.path ] === 'undefined') {
            DbIdObject.subscriptions[ root.path ] = new ReplaySubject<Array<R>>();
            FirebaseListFactory<R>(root, type)
                .subscribe((arr: Array<R>) => {
                    (DbIdObject.subscriptions[ root.path ] as ReplaySubject<Array<R>>)
                        .next(arr);
                });
        }
        return DbIdObject.subscriptions[ root.path ];
    }

    // TODO: move ORM mapping login to unwrapper function?
    constructor(public $ref: DatabaseReference,
                public $exists: boolean,
                public $key: string) {
        if (!this.$exists) {
            this.created = new Date();
        }
    }

    public getId(): number {
        return typeof this.id === 'string' ? parseInt(this.id as string) : this.id as number;
    }

    protected add<R extends DbIdObject>(path: string, data: R): Observable<this> {
        return Observable.of(this);
        // return FirebaseListFactory(this.$ref.child(set))
        //    .flatMap(r => r.push(data.$key))
        //    .map(() => this);

    }

    protected remove<R extends DbIdObject>(path: string, data: R): Observable<this> {
        return Observable.of(this);
        // const list = FirebaseListFactory(this.$ref.child(set));
        // return list
        //    .flatMap(r => list.$ref.ref.child(r.indexOf(data.$key)).remove())
        //    .map(() => this);

    }

    protected list<R extends DbIdObject>(path: string,
                                         foreign: keyof DbIdObject,
                                         type: any): Observable<Array<R>> {
        const id = this.getId();
        const rootPath = this.$ref.ref.root.child(path);
        const key = path.split('_')
            .map((p, i) => i > 0 ? p.substr(0, 1).toUpperCase() + p.substr(1) : p)
            .join('') + 's';
        // TODO: when in admin row or ACL building mode, go the distance
        // use traditional method of storing a simple list of ids
        if (!DbIdObject.REBUILD_INDEX && typeof (this as any)[ key ] !== 'undefined' && (this as any)[ key ] !== null) {
            if (typeof DbIdObject.subscriptions[ this.$ref.child(key).path ] === 'undefined') {
                DbIdObject.subscriptions[ this.$ref.child(key).path ] = new ReplaySubject<Array<R>>();

                FireListFactory(this.$ref.child(key))
                    .flatMap((keys: Array<any>) => {
                        return Observable.zip(...keys
                            .map(k => k.$value as string)
                            .map((rid: string) => FirebaseObjectFactory<R>(rootPath.child(rid), type)));
                    })
                    .subscribe((arr: Array<R>) => {
                        (DbIdObject.subscriptions[ this.$ref.child(key).path ] as ReplaySubject<Array<R>>)
                            .next(arr);
                    });
            }
            return DbIdObject.subscriptions[ this.$ref.child(key).path ];
        }

        // look up IDs out of the entire list of entities
        let results: Array<R>;
        return DbIdObject.list<R>(rootPath, type)
            .map(r => (results = r
                .filter((up: R) => '' + up[ foreign ] === '' + id)
                .map((result: any) => result as R)))
            .flatMap(() => this.$ref.child(key).set(results.map((up: R) => up.$key)))
            .map(() => results);
    }

    protected setFk<R extends DbIdObject>(property: keyof DbIdObject, item?: R): Observable<this> {
        const id = typeof item !== 'undefined' ? item.getId() : void 0;
        this[ property ] = id;
        return Observable.of(this.$ref.child(property).set(id)).map(() => this);
    }

    protected getFkId<R extends DbIdObject>(property: keyof DbIdObject): number {
        return typeof this[ property ] === 'string' ? parseInt(this[ property ] as string) : this[ property ] as number;
    }

    protected getFk<R extends DbIdObject>(root: keyof DbIdObject, type: any): Observable<R> {
        if (typeof this[ root ] === 'undefined' || this[ root ] === null) {
            return Observable.of(void 0);
        }
        const rootPath = this.$ref.root.child(('' + root).replace('_id', ''));
        const key = ('' + root).replace('_id', '') + '_fk';
        if (!DbIdObject.REBUILD_INDEX && typeof (this as any)[ key ] !== 'undefined' && (this as any)[ key ] !== null) {
            return FirebaseObjectFactory<R>(rootPath.child((this as any)[ key ]), type);
        }

        let result: R;
        return DbIdObject.list<R>(rootPath, type)
            .map(r => (result = r
                .filter((up: R) => '' + up.getId() === '' + (this as any)[ root ])[ 0 ]))
            .flatMap(() => this.$ref.child(key).set(result.$key))
            .map(() => result);
    }
}

export class DbObject<T> extends DbIdObject {
    protected modified: Date | string;

    public getCreated(): Date {
        return typeof this.created === 'string' ? new Date(this.created) : this.created as Date;
    }

    public getModified(): Date {
        return typeof this.modified === 'string' ? new Date(this.modified) : this.modified as Date;
    }
}

export class DbDeletableObject<T> extends DbObject<T> {
    protected deleted: boolean | number = false;

    public getDeleted(): boolean {
        return this.deleted === true || this.deleted > 0;
    }

    public setDeleted(deleted: boolean): void {

    }
}

export class DbPropertiesObject<T> extends DbDeletableObject<T> {
    protected properties: { [index: string]: any } = {};

    public setProperty(prop: string, value: any): this {
        this.properties[ prop ] = value;
        this.setProperties(this.properties);
        return this;
    }

    public getProperty(prop: string): any {
        return this.properties[ prop ];
    }

    public setProperties(properties: { [index: string]: any }): this {
        this.properties = properties;

        return this;
    }

    public getProperties(): { [index: string]: any } {
        return this.properties;
    }
}
