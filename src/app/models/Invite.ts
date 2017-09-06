import { Pack } from './Pack';
import { User } from './User';
import { Group } from './Group';
import { DbPropertiesObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactory } from '../core/database';
import { GroupCollectionForeignKey, PackCollectionForeignKey, UserCollectionForeignKey } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="invite")
 * @ORM\HasLifecycleCallbacks()
 */
export class Invite extends DbPropertiesObject<Invite> implements GroupCollectionForeignKey<Invite>,
                                                                  PackCollectionForeignKey<Invite>,
                                                                  UserCollectionForeignKey<Invite> {

    /**
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="invites")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="$key", nullable=true)
     */

    /**
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="invites")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key", nullable=true)
     */

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invites")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invitees")
     * @ORM\JoinColumn(name="invitee_id", referencedColumnName="$key", nullable=true)
     */

    /**
     * @ORM\Column(type="string", length=256, name="firstName")
     */
    protected firstName = '';

    /**
     * @ORM\Column(type="string", length=256, name="lastName")
     */
    protected lastName = '';

    /**
     * @ORM\Column(type="string", length=256, name="email")
     */
    protected email = '';

    /**
     * @ORM\Column(type="boolean", name="activated")
     */
    protected activated = false;

    /**
     * @ORM\Column(type="string", length=64, name="code")
     */
    protected code: string;

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * @ORM\Column(type="datetime", name="reminder", nullable = true)
     */
    protected reminder: Date;

    /** @ORM\Column(name="properties", type="array", nullable=true) */
    setPack = (pack: Pack) => Observable.of(this);
    getPackId = () => 0;
    getPack = () => Observable.of(void 0 as Pack);

    setGroup = (bundle: Group) => Observable.of(this);
    getGroupId = () => 0;
    getGroup = () => Observable.of(void 0 as Group);

    public setUser = (user?: User) => this.setFk<User>('user_id', user);
    public getUserId = () => this.getFkId<User>('user_id');
    public getUser = (): Observable<User> => this.getFk<User>('user_id', User);

    /**
     * Set firstName
     *
     * @return Invite
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
     * @return Invite
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
     * @return Invite
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
     * Set activated
     *
     * @return Invite
     * @param activated
     */
    public setActivated(activated: boolean): this {
        this.activated = activated;

        return this;
    }

    /**
     * Get activated
     *
     * @return boolean
     */
    public getActivated(): boolean {
        return this.activated;
    }

    /**
     * Set code
     *
     * @return Invite
     * @param code
     */
    public setCode(code: string): this {
        this.code = code;

        return this;
    }

    /**
     * Get code
     *
     * @return string
     */
    public getCode(): string {
        return this.code;
    }

    /**
     * Set reminder
     *
     * @return Invite
     * @param reminder
     */
    public setReminder(reminder: Date): this {
        this.reminder = reminder;

        return this;
    }

    /**
     * Get reminder
     *
     * @return Date
     */
    public getReminder(): Date {
        return this.reminder;
    }

    /**
     * Set invitee
     *
     * @return Invite
     * @param invitee
     */
    public setInvitee(invitee?: User): Observable<this> {
        this.invitee_id = invitee.getId();
        return Observable.of(this.$ref.child('invitee_id').set(this.invitee_id)).map(() => this);
    }

    /**
     * Get invitee
     *
     * @return User
     */
    public getInvitee(): Observable<User> {
        return FirebaseObjectFactory<User>(this.$ref.root.child('user/' + this.invitee_id), User);
    }
}
