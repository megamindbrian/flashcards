import { Pack } from './Pack';
import { User } from './User';
import { Group } from './Group';
import { DbIdObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactory } from '../core/database';
/**
 * @ORM\Entity
 * @ORM\Table(name="invite")
 * @ORM\HasLifecycleCallbacks()
 */
export class Invite extends DbIdObject<Invite> {

    /**
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="invites")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="$key", nullable=true)
     */
    protected group_id: number;

    /**
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="invites")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key", nullable=true)
     */
    protected pack_id: number;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invites")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */
    protected user_id: number;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invitees")
     * @ORM\JoinColumn(name="invitee_id", referencedColumnName="$key", nullable=true)
     */
    protected invitee_id: number;

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
    protected created: Date;

    /**
     * @ORM\Column(type="datetime", name="reminder", nullable = true)
     */
    protected reminder: Date;

    /** @ORM\Column(name="properties", type="array", nullable=true) */
    protected properties: { [index: string]: any };

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

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
     * Set created
     *
     * @return Invite
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
     * Set group
     *
     * @return Invite
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
    public getGroup(): Observable<Group> {
        return FirebaseObjectFactory<Group>(this.$ref.root.child('group/' + this.group_id), Group);
    }

    /**
     * Set user
     *
     * @return Invite
     * @param user
     */
    public setUser(user?: User): Observable<this> {
        this.user_id = user.getId();
        return Observable.of(this.$ref.child('user_id').set(this.user_id)).map(() => this);
    }

    /**
     * Get user
     *
     * @return User
     */
    public getUser(): Observable<User> {
        return FirebaseObjectFactory<User>(this.$ref.root.child('user/' + this.user_id), User);
    }

    /**
     * Set pack
     *
     * @return Invite
     * @param pack
     */
    public setPack(pack?: Pack): Observable<this> {
        this.pack_id = pack.getId();
        return Observable.of(this.$ref.child('pack_id').set(this.pack_id)).map(() => this);
    }

    /**
     * Get pack
     *
     * @return Pack
     */
    public getPack(): Observable<Pack> {
        return FirebaseObjectFactory<Pack>(this.$ref.root.child('pack/' + this.pack_id), Pack);
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

    /**
     * Set properties
     *
     * @return Invite
     * @param properties
     */
    public setProperties(properties: any): this {
        this.properties = properties;

        return this;
    }

    /**
     * Get properties
     *
     * @return array
     */
    public getProperties(): any {
        return this.properties;
    }
}
