import { Group } from './Group';
import { Pack } from './Pack';
import { File } from './File';
import { Payment } from './Payment';
import { DbPropertiesObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { FileCollectionForeignKey, GroupCollectionForeignKey, PackCollection, PaymentCollection } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="bundle")
 * @ORM\HasLifecycleCallbacks()
 */
export class Bundle extends DbPropertiesObject<Bundle> implements GroupCollectionForeignKey<Bundle>,
                                                                  PackCollection,
                                                                  PaymentCollection {

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

    /**
     * @ORM\ManyToMany(targetEntity="Pack")
     * @ORM\JoinTable(name="bundle_pack",
     *      joinColumns={@ORM\JoinColumn(name="bundle_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="pack_id", referencedColumnName="$key")})
     */

    /**
     * @ORM\Column(type="array", name="properties", nullable=true)
     */

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

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */

    /**
     * @ORM\ManyToMany(targetEntity="Payment", mappedBy="bundles", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    public addPack = (pack: Pack) => this.add('packs', pack);
    public removePack = (pack: Pack) => this.remove('packs', pack);
    public getPacks = (): Observable<Array<Pack>> => this.list('pack', 'bundle_id', Pack);

    public addPayment = (item: Payment) => this.add('payments', item);
    public removePayment = (item: Payment) => this.remove('payments', item);
    public getPayments = (): Observable<Array<Payment>> => this.list('payment', 'bundle_id', Payment);

    public setGroup = (group?: Group) => this.setFk<Group>('group_id', group);
    public getGroupId = () => this.getFkId<Group>('group_id');
    public getGroup = (): Observable<Group> => this.getFk<Group>('group_id', Group);

    public getCardCount(): Observable<number> {
        return this.getPacks()
            .map(p => p.filter(pack => !pack.getDeleted()).length);
    }

    public getLogo(): Observable<File> {
        return this.getGroup().flatMap((g: Group) => {
            return g.getFile();
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

}
