import { Bundle } from './Bundle';
import { Pack } from './Pack';
import { User } from './User';
import { DbDeletableObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { BundleCollection } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="payment")
 * @ORM\HasLifecycleCallbacks()
 */
export class Payment extends DbDeletableObject<Payment> implements BundleCollection {

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="payments")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */
    protected user: User;

    /**
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="payments")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key", nullable=true)
     */
    protected pack: Pack;

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

    addBundle = (bundle: Bundle) => Observable.of(this);
    removeBundle = (bundle: Bundle) => Observable.of(this);
    getBundles = () => Observable.of([] as Array<Bundle>);

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

    /**
     * Set user
     *
     * @return Payment
     * @param user
     */
    public setUser(user?: User): this {
        this.user = user;

        return this;
    }

    /**
     * Get user
     *
     * @return User
     */
    public getUser(): User {
        return this.user;
    }

    /**
     * Set pack
     *
     * @return Payment
     * @param pack
     */
    public setPack(pack?: Pack): this {
        this.pack = pack;

        return this;
    }

    /**
     * Get pack
     *
     * @return Pack
     */
    public getPack(): Pack {
        return this.pack;
    }

}
