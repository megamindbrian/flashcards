import { Group } from './Group';
import { Pack } from './Pack';
import { Payment } from './Payment';
import { DbIdObject } from './DbIdObject';
import {
    FirebaseListFactory, FirebaseListObservable, FirebaseObjectFactory,
    FirebaseObjectObservable
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
    protected group: FirebaseObjectObservable<Group> = FirebaseObjectFactory(this.$ref.child('group'));

    /**
     * @ORM\ManyToMany(targetEntity="Pack")
     * @ORM\JoinTable(name="bundle_pack",
     *      joinColumns={@ORM\JoinColumn(name="bundle_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="pack_id", referencedColumnName="$key")})
     */
    protected packs: FirebaseListObservable<Pack> = FirebaseListFactory(this.$ref.child('packs'));

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
    protected payments: Array<Payment> = [];

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

    public getCardCount(): Observable<number> {
        return this.getPacks().filter(p => !p.getDeleted()).flatMap(p => Observable.of(p.length));
    }

    public getLogo(): Observable<File> {
        return this.getGroup().flatMap(g => {
            if (typeof g !== 'undefined' && typeof g.getLogo() !== 'undefined') {
                return Observable.of(g.getFile());
            } else {
                return this.getPacks().flatMap(p => p.getLogo().getFile());
            }
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
        return this.group.map(() => {
            return this.$ref.child('group').set(group);
        }).map(() => this);
    }

    /**
     * Get group
     *
     * @return Group
     */
    public getGroup(): FirebaseObjectObservable<Group> {
        return this.group;
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
     * @param payments
     */
    public addPayment(payments: Payment): this {
        this.payments[ this.payments.length ] = payments;

        return this;
    }

    /**
     * Remove payments
     *
     * @param payments
     */
    public removePayment(payments: Payment): Array<Payment> {
        this.$ref.child('payments/' + this.payments.indexOf(payments)).remove();
        return this.payments;
    }

    /**
     * Get payments
     *
     * @return Array<Payment>
     */
    public getPayments(): Array<Payment> {
        return this.payments;
    }

    /**
     * Add pack
     *
     *
     * @return Bundle
     * @param pack
     */
    public addPack(pack: Pack): this {
        this.packs.push(pack);

        return this;
    }

    /**
     * Remove pack
     *
     * @param pack
     */
    public removePack(pack: Pack): Observable<Pack> {
        return this.packs.map(p => {
            return this.$ref.child('packs/' + p.indexOf(pack)).remove();
        }).flatMap(() => this.packs);
    }

    /**
     * Get packs
     *
     * @return Array<Pack>
     */
    public getPacks(): FirebaseListObservable<Pack> {
        return this.packs;
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
