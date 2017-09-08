// expose database so objects maintain their own reference code
import { DatabaseReference } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { FirebaseListFactory } from 'angularfire2/database';

export class DbIdObject {
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

    // TODO: move ORM mapping login to unwrapper function?
    constructor(protected $ref: DatabaseReference,
                protected $exists: boolean,
                protected $key: string) {
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
        // const list = FirebaseListFactory<R>(this.$ref.child(path), type);
        const rootPath = this.$ref.ref.root.child(path);

        // TODO: when in admin row or ACL building mode, go the distance
        return FirebaseListFactory(rootPath)
            .map((ups: Array<R>) => ups
                .filter((up: R) => '' + up[ foreign ] === '' + this.getId()));

        /*
        // use traditional method of storing a simple list of ids
        return list
            .flatMap((r: Array<string>) =>
                Observable.zip(...r.map((rid: string) =>
                    FirebaseObjectFactory<R>(rootPath.child(rid), type))))
            .map((r: Array<any>) => r.map((result: any) => result as R));
            */
    }

    protected setFk<R extends DbIdObject>(property: keyof DbIdObject, item?: R): Observable<this> {
        const id = typeof item !== 'undefined' ? item.getId() : void 0;
        this[ property ] = id;
        return Observable.of(this.$ref.child(property).set(id)).map(() => this);
    }

    protected getFkId<R extends DbIdObject>(property: keyof DbIdObject): number {
        return typeof this[ property ] === 'string' ? parseInt(this[ property ] as string) : this[ property ] as number;
    }

    protected getFk<R extends DbIdObject>(property: keyof DbIdObject, type: any): Observable<R> {
        const ref = this.$ref.root.child(('' + property)
            .replace('_id', ''));
        return FirebaseListFactory(ref)
            .map((ups: Array<R>) => ups
                .filter((up: R) => '' + up.getId() === '' + this[ property ])[ 0 ]);
        /*
        return FirebaseObjectFactory<R>(
            this.$ref.root.child(('' + property)
                .replace('_id', ''))
                .child('' + this[ property ])
            , type);
            */
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
