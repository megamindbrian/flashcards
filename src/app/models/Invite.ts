import { Pack } from './Pack';
import { User } from './User';
import { Group } from './Group';
import { DbIdObject } from './DbIdObject';
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
    protected group: Group;

    /**
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="invites")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key", nullable=true)
     */
    protected pack: Pack;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invites")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */
    protected user: User;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invitees")
     * @ORM\JoinColumn(name="invitee_id", referencedColumnName="$key", nullable=true)
     */
    protected invitee: User;

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
    public setGroup(group?: Group): this {
        this.group = group;

        return this;
    }

    /**
     * Get group
     *
     * @return Group
     */
    public getGroup(): Group {
        return this.group;
    }

    /**
     * Set user
     *
     * @return Invite
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
     * @return Invite
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

    /**
     * Set invitee
     *
     * @return Invite
     * @param invitee
     */
    public setInvitee(invitee?: User): this {
        this.invitee = invitee;

        return this;
    }

    /**
     * Get invitee
     *
     * @return User
     */
    public getInvitee(): User {
        return this.invitee;
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
