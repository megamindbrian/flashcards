import { Bundle } from './Bundle';
import { Pack } from './Pack';
import { User } from './User';
import { DbDeletableObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { BundleCollection, PackCollectionForeignKey, UserCollectionForeignKey } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="payment")
 * @ORM\HasLifecycleCallbacks()
 */
export class Payment extends DbDeletableObject<Payment> implements BundleCollection,
                                                                   UserCollectionForeignKey<Payment>,
                                                                   PackCollectionForeignKey<Payment> {

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="payments")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */

    /**
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="payments")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key", nullable=true)
     */

    /**
     * @ORM\Column(type="string", length=12, name="amount")
     */
    protected amount: string;

    /**
     * @ORM\Column(type="string", length=256, name="firstName")
     */
    protected firstName: string;

    /**
     * @ORM\Column(type="string", length=256, name="lastName")
     */
    protected lastName: string;

    /**
     * @ORM\Column(type="string", length=256, name="email")
     */
    protected email: string;

    /**
     * @ORM\Column(type="string", length=256, name="payment", nullable=true)
     */
    protected payment: string;

    /**
     * @ORM\Column(type="string", length=256, name="subscription", nullable=true)
     */
    protected subscription: string;

    public addBundle = (item: Bundle) => this.add('bundles', item);
    public removeBundle = (item: Bundle) => this.remove('bundles', item);
    public getBundles = (): Observable<Array<Bundle>> => this.list('bundle', 'payment_id', Bundle);

    public setPack = (item?: Pack) => this.setFk<Pack>('pack_id', item);
    public getPackId = () => this.getFkId<Pack>('pack_id');
    public getPack = (): Observable<Pack> => this.getFk<Pack>('pack_id', Pack);

    public setUser = (user?: User) => this.setFk<User>('user_id', user);
    public getUserId = () => this.getFkId<User>('user_id');
    public getUser = (): Observable<User> => this.getFk<User>('user_id', User);

    /**
     * @ORM\ManyToMany(targetEntity="Bundle")
     * @ORM\JoinTable(name="payment_bundle",
     *      joinColumns={@ORM\JoinColumn(name="payment_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="bundle_id", referencedColumnName="$key")})
     */

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */

    /**
     * Set amount
     *
     * @return Payment
     * @param amount
     */
    public setAmount(amount: string): this {
        this.amount = amount;

        return this;
    }

    /**
     * Get amount
     *
     * @return string
     */
    public getAmount(): string {
        return this.amount;
    }

    /**
     * Set firstName
     *
     * @return Payment
     * @param first
     */
    public setFirstName(first: string): this {
        this.firstName = first;

        return this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public getFirstName(): string {
        return this.firstName;
    }

    /**
     * Set lastName
     *
     * @return Payment
     * @param last
     */
    public setLastName(last: string): this {
        this.lastName = last;

        return this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public getLastName(): string {
        return this.lastName;
    }

    /**
     * Set email
     *
     * @return Payment
     * @param email
     */
    public setEmail(email: string): this {
        this.email = email;

        return this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Set payment
     *
     * @return Payment
     * @param payment
     */
    public setPayment(payment: string): this {
        this.payment = payment;

        return this;
    }

    /**
     * Get payment
     *
     * @return string
     */
    public getPayment(): string {
        return this.payment;
    }

    /**
     * Set subscription
     *
     * @return Payment
     * @param subscription
     */
    public setSubscription(subscription: string): this {
        this.subscription = subscription;

        return this;
    }

    /**
     * Get subscription
     *
     * @return string
     */
    public getSubscription(): string {
        return this.subscription;
    }
}
