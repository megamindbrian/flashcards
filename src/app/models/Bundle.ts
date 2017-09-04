import { Group } from './Group';
import { Pack } from './Pack';
import { File } from './File';
import { Payment } from './Payment';
import { DbIdObject } from './DbIdObject';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactory } from '../core/database';

/**
 * @ORM\Entity
 * @ORM\Table(name="bundle")
 * @ORM\HasLifecycleCallbacks()
 */
export class Bundle extends DbIdObject<Bundle> {

    /**
     * @ORM\Column(type="string", length=256, name="name")
     */
    protected name: string;

    /**
     * @ORM\Column(type="string", length=4096, name="description")
     */
    protected description = '';

    /**
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="bundles")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="$key", nullable=true)
     */
    protected group_id: number;

    /**
     * @ORM\ManyToMany(targetEntity="Pack")
     * @ORM\JoinTable(name="bundle_pack",
     *      joinColumns={@ORM\JoinColumn(name="bundle_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="pack_id", referencedColumnName="$key")})
     */
    protected packs: Array<number>;

    /**
     * @ORM\Column(type="array", name="options", nullable=true)
     */
    protected options: any;

    /**
     * @ORM\Column(type="datetime", name="valid_from", nullable=true)
     */
    protected validFrom: Date;

    /**
     * @ORM\Column(type="datetime", name="valid_to", nullable=true)
     */
    protected validTo: Date;

    /**
     * @ORM\Column(type="integer", name="max_uses")
     */
    protected maxUses = 1;

    /**
     * @ORM\Column(type="string", length=32, name="seed")
     */
    protected seed = '';

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */
    protected deleted = false;

    /**
     * @ORM\ManyToMany(targetEntity="Payment", mappedBy="bundles", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected payments: FirebaseListObservable<Array<Payment>>;

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

    public getCardCount(): Observable<number> {
        return this.getPacks()
            .map(p => p.filter(pack => !pack.getDeleted()).length);
    }

    public getLogo(): Observable<File> {
        return this.getGroup().flatMap(g => {
            return Observable.of(g.getFile());
            /*
             if (typeof g !== 'undefined' && typeof g.getLogo() !== 'undefined') {
             } else {
             return this.getPacks()
             .flatMap((p: Array<Pack>) => Observable.merge(p.map((pack: Pack) => pack.getLogo())))
             .toArray()
             .flatMap((p: Array<File>) => Observable.merge(p.map((pack: File) => pack.getFile())))
             .toArray()
             .map(p => p.first());
             }
             */
        });
    }

    /**
     * Set name
     *
     * @return Bundle
     * @param name
     */
    public setName(name: string): this {
        this.name = name;

        return this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Set description
     *
     * @return Bundle
     * @param description
     */
    public setDescription(description: string): this {
        this.description = description;

        if (typeof this.name !== 'undefined') {
            const words = this.description.split(/[\s,_-]+/ig);
            const acronym = words.map(w => [ 0 ]).join('');
            this.setName(acronym.toUpperCase() + (new Date()).toString());
        }

        return this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public getDescription(): string {
        return this.description;
    }

    /**
     * Set validFrom
     *
     * @return Bundle
     * @param validFrom
     */
    public setValidFrom(validFrom: Date): this {
        this.validFrom = validFrom;

        return this;
    }

    /**
     * Get validFrom
     *
     * @return Date
     */
    public getValidFrom(): Date {
        return this.validFrom;
    }

    /**
     * Set validTo
     *
     * @return Bundle
     * @param validTo
     */
    public setValidTo(validTo: Date): this {
        this.validTo = validTo;

        return this;
    }

    /**
     * Get validTo
     *
     * @return Date
     */
    public getValidTo(): Date {
        return this.validTo;
    }

    /**
     * Set maxUses
     *
     * @return Bundle
     * @param maxUses
     */
    public setMaxUses(maxUses: number): this {
        this.maxUses = maxUses;

        return this;
    }

    /**
     * Get maxUses
     *
     * @return integer
     */
    public getMaxUses(): number {
        return this.maxUses;
    }

    /**
     * Set seed
     *
     * @return Bundle
     * @param seed
     */
    public setSeed(seed: string): this {
        this.seed = seed;

        return this;
    }

    /**
     * Get seed
     *
     * @return string
     */
    public getSeed(): string {
        return this.seed;
    }

    /**
     * Set created
     *
     * @return Bundle
     * @param created
     */
    public setCreated(created: Date): this {
        this.created = created;

        return this;
    }

    /**
     * Get created
     *
     * @return Date
     */
    public getCreated(): Date {
        return this.created;
    }

    /**
     * Set deleted
     *
     * @return Bundle
     * @param deleted
     */
    public setDeleted(deleted: boolean): this {
        this.deleted = deleted;

        return this;
    }

    /**
     * Get deleted
     *
     * @return boolean
     */
    public getDeleted(): boolean {
        return this.deleted;
    }

    /**
     * Set group
     *
     * @return Bundle
     * @param group
     */
    public setGroup(group?: Group): Observable<this> {
        this.group_id = group.getId();
        return Observable.of(this.$ref.child('group_id').set(this.group_id)).map(() => this);
    }

    /**
     * Get group
     *
     * @return Group
     */
    public getGroup(): FirebaseObjectObservable<Group> {
        return FirebaseObjectFactory<Group>(this.$ref.root.child('card/' + this.group_id), Group);
    }

    /**
     * Set options
     *
     * @return Bundle
     * @param options
     */
    public setOptions(options: any): this {
        if (typeof options === 'string') {
            try {
                this.options = options;
            } catch (e) {

            }
        } else {
            this.options = options;
        }

        return this;
    }

    /**
     * Get options
     *
     * @return array
     */
    public getOptions(): any {
        return this.options;
    }

    /**
     * Add payments
     *
     * @return Bundle
     * @param payment
     */
    public addPayment(payment: Payment): Observable<this> {
        return this.add('payments', payment);
    }

    /**
     * Remove payments
     *
     * @param payments
     */
    public removePayment(payments: Payment): Observable<this> {
        return this.remove('payments', payments);
    }

    /**
     * Get payments
     *
     * @return Array<Payment>
     */
    public getPayments(): Observable<Array<Payment>> {
        return this.list('payments', ref => FirebaseObjectFactory<Payment>(ref, Payment));
    }

    /**
     * Add pack
     *
     *
     * @return Bundle
     * @param pack
     */
    public addPack(pack: Pack): Observable<this> {
        return this.add('packs', pack);
    }

    /**
     * Remove pack
     *
     * @param pack
     */
    public removePack(pack: Pack): Observable<this> {
        return this.remove('packs', pack);
    }

    /**
     * Get packs
     *
     * @return Array<Pack>
     */
    public getPacks(): Observable<Array<Pack>> {
        return this.list('packs', ref => FirebaseObjectFactory<Pack>(ref, Pack));
    }

    /**
     * @param packs
     */
    public setPacks(packs: Array<Pack>): this {
        for (const p in packs) {
            if (!packs.hasOwnProperty(p)) {
                continue;
            }
            this.$ref.child('packs').push(packs[ p ]);
        }
        return this;
    }

}
