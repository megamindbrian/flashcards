import { Group } from './Group';
import { Pack } from './Pack';
import { Payment } from './Payment';
import { Visit } from './Visit';
import { Invite } from './Invite';
import { UserPack } from './UserPack';
import { BaseUser } from './BaseUser';
import { Response } from './Response';
import { File } from './File';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * @ORM\Entity
 * @ORM\Table(name="ss_user",uniqueConstraints={
 *     @ORM\UniqueConstraint(name="email_idx", columns={"email"}),
 *     @ORM\UniqueConstraint(name="username_idx", columns={"username"})})
 * @ORM\HasLifecycleCallbacks()
 * @ORM\NamedNativeQueries({
 *      @ORM\NamedNativeQuery(
 *          name            = "sessionCount",
 *          resultSetMapping= "mappingSessionCount",
 *          query           = "SELECT COUNT(*) AS sessions FROM ss_user INNER JOIN visit ON id = user_id GROUP BY session_id"
 *      )
 * })
 * @ORM\SqlResultSetMappings({
 *      @ORM\SqlResultSetMapping(
 *          name    = "mappingSessionCount",
 *          columns = {
 *              @ORM\ColumnResult("sessions")
 *          }
 *      )
 * })
 */

export class User extends BaseUser {

    /**
     * @ORM\OneToMany(targetEntity="Payment", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected payments: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\OneToMany(targetEntity="Visit", mappedBy="user", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected visits: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected invites: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="invitee")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected invitees: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\OneToMany(targetEntity="Pack", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected authored: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\OneToMany(targetEntity="UserPack", mappedBy="user", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected userPacks: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\OneToMany(targetEntity="File", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected files: Array<File>;

    /**
     * @ORM\OneToMany(targetEntity="Response", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected responses: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\Column(type="datetime", name="last_visit", nullable = true)
     */
    protected lastVisit: Date;

    /**
     * @ORM\Column(type="string", length=256, name="firstName")
     */
    protected firstName = '';

    /**
     * @ORM\Column(type="string", length=256, name="lastName")
     */
    protected lastName = '';

    /**
     * @ORM\OneToOne(targetEntity="File")
     * @ORM\JoinColumn(name="file_id", referencedColumnName="$key", nullable = true)
     */
    protected photo: File;

    /** @ORM\Column(name="devices", type="simple_array", nullable=true) */
    protected devices: Array<string>;

    /**
     * @ORM\ManyToMany(targetEntity="Group")
     * @ORM\JoinTable(name="ss_user_group",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="$key")})
     */
    protected groups: FirebaseListObservable<Array<number>>;

    /** @ORM\Column(name="properties", type="array", nullable=true) */
    protected properties: { [index: string]: any } = {};

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

    /**
     * @return Invite|User
     */
    public getParent(): Observable<User | Invite> {
        // purchase with parent account
        const usernameMerge = this.getInvitees()
            .filter(i => this.getUsername().substr(0, i.getUser().getUsername().length + 1)
            === i.getUser().getUsername() + '_');
        return usernameMerge.map(i => i.length > 0 ? i.getUser() : Observable.of(this));

        // TODO: use this for advisor setup
        /** @var Invite partner */
        /*
         let partner = this.getPartnerInvites().firstName();
         let advisers = array_values(this.getGroups()
         .map((g: Group) => {
         return g.getUsers().filter((u: User) => {
         return u.hasRole('ROLE_ADVISER');
         });
         })
         .filter((c) => {
         return typeof c !== 'undefined';
         })
         );
         if (advisers.length > 1)
         advisers = call_user_func_array('array_merge', advisers);
         else if (advisers.length > 0)
         advisers = advisers[ 0 ];
         advisers.sort((a: User, b: User) => {
         return a.hasRole('ROLE_MASTER_ADVISER') - b.hasRole('ROLE_MASTER_ADVISER');
         });
         /** @var User adviser */
        // let adviser = reset(advisers);
        // return typeof adviser !== 'undefined' ? adviser : partner;
    }

    /**
     * @param prop
     * @param value
     */
    public setProperty(prop: string, value: any): this {
        this.properties[ prop ] = value;
        this.setProperties(this.properties);
        return this;
    }

    /**
     * @param prop
     * @return null
     */
    public getProperty(prop: string): any {
        return this.properties[ prop ];
    }

    public getUsers(): Observable<User> {
        return this.userPacks.map(p => p.getUser());
    }

    /**
     * @return Array<Response>
     * @param pack
     */
    public getResponsesForPack(pack: Pack): Observable<Response> {
        return this.responses.flatMap(r => r.filter((response: Response) => response.getCard().getPack() === pack));
    }

    /**
     * @return Array<Pack>
     */
    public getPacks(): Observable<Pack> {
        return this.authored.concat(this.userPacks.map(p => p
            .filter((up: UserPack) => !up.getRemoved())
            .map((up: UserPack) => up.getPack())))
            .map(p => p
                .filter((elem: string, pos: number, arr: Array<string>) => {
                    return arr.indexOf(elem) === pos;
                }));
    }

    /**
     * @return UserPack|null
     * @param p
     */
    public getUserPack(p: Pack): Observable<UserPack> {
        return this.userPacks.filter(up => up.getPack() === p).first();
    }

    /**
     * @return UserPack|null
     * @param pid
     */
    public getUserPackById(pid: string): Observable<UserPack> {
        return this.userPacks.filter((up: UserPack) => {
            return up.getPack().getKey() === pid;
        }).first();
    }

    /**
     * Returns the user roles
     *
     * @return array The roles
     */
    public getRoles(): Array<string> {
        return this.roles.concat(...this.getGroups().map(g => g.getRoles()))
            .concat([ BaseUser.ROLE_DEFAULT ])
            .filter((elem: string, pos: number, arr: Array<string>) => {
                return arr.indexOf(elem) === pos;
            });
    }

    /**
     * Set created
     *
     * @return User
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
     * Set firstName
     *
     * @return User
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
     * @return User
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
     * Set properties
     *
     * @return User
     * @param properties
     */
    public setProperties(properties: { [index: string]: any }): this {
        this.properties = properties;

        return this;
    }

    /**
     * Get properties
     *
     * @return string
     */
    public getProperties(): { [index: string]: any } {
        return this.properties;
    }

    /**
     * Add payments
     *
     * @return User
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
     * Add visits
     *
     * @return User
     * @param visits
     */
    public addVisit(visits: Visit): this {
        this.visits[ this.visits.length ] = visits;

        return this;
    }

    /**
     * Remove visits
     *
     * @param visits
     */
    public removeVisit(visits: Visit): Array<Visit> {
        this.$ref.child('visits/' + this.visits.indexOf(visits)).remove();
        return this.visits;
    }

    /**
     * Get visits
     *
     * @return Array<Visit>
     */
    public getVisits(): Array<Visit> {
        return this.visits;
    }

    /**
     * Add files
     *
     * @return User
     * @param files
     */
    public addFile(files: File): this {
        this.files[ this.files.length ] = files;

        return this;
    }

    /**
     * Remove files
     *
     * @param files
     */
    public removeFile(files: File): Array<File> {
        this.$ref.child('files/' + this.files.indexOf(files)).remove();
        return this.files;
    }

    /**
     * Get files
     *
     * @return Array<File>
     */
    public getFiles(): Array<File> {
        return this.files;
    }

    /**
     * Set photo
     *
     * @return User
     * @param photo
     */
    public setPhoto(photo?: File): this {
        this.photo = photo;

        return this;
    }

    /**
     * Get photo
     *
     * @return File
     */
    public getPhoto(): File {
        return this.photo;
    }

    /**
     * Set lastVisit
     *
     * @return User
     * @param lastVisit
     */
    public setLastVisit(lastVisit: Date): this {
        this.lastVisit = lastVisit;

        return this;
    }

    /**
     * Get lastVisit
     *
     * @return Date
     */
    public getLastVisit(): Date {
        return this.lastVisit;
    }

    /**
     * Add invites
     *
     * @return User
     * @param invites
     */
    public addInvite(invites: Invite): this {
        this.invites[ this.invites.length ] = invites;

        return this;
    }

    /**
     * Remove invites
     *
     * @param invites
     */
    public removeInvite(invites: Invite): Array<Invite> {
        this.$ref.child('invites/' + this.invites.indexOf(invites)).remove();
        return this.invites;
    }

    /**
     * Get invites
     *
     * @return Array<Invite>
     */
    public getInvites(): Array<Invite> {
        return this.invites;
    }

    /**
     * Add invitees
     *
     * @return User
     * @param invitees
     */
    public addInvitee(invitees: Invite): Observable<this> {
        return this.invitees.map(() => this.invitees.push(invitees))
            .map(() => this);
    }

    /**
     * Remove invitees
     *
     * @param invitees
     */
    public removeInvitee(invitees: Invite): Observable<Invite> {
        return this.invitees.map(i => i.indexOf(invitees))
            .map(i => this.$ref.child('invitees/' + i).remove())
            .flatMap(() => this.invitees);
    }

    /**
     * Get invitees
     *
     * @return Array<Invite>
     */
    public getInvitees(): FirebaseListObservable<Invite> {
        return this.invitees;
    }

    /**
     * Add responses
     *
     * @return User
     * @param responses
     */
    public addResponse(responses: Response): Observable<this> {
        return Observable.of(void 0)
            .map(() => this.responses.push(responses))
            .map(() => this);
    }

    /**
     * Remove responses
     *
     * @param responses
     */
    public removeResponse(responses: Response): Observable<Response> {
        return this.responses.map(a => a.indexOf(responses))
            .map(i => i > -1 ? this.$ref.child('responses/' + i).remove() : Observable.of(void 0))
            .flatMap(() => this.responses);
    }

    /**
     * Get responses
     *
     * @return Array<Response>
     */
    public getResponses(): FirebaseListObservable<Response> {
        return this.responses;
    }

    /**
     * Add authored
     *
     * @return User
     * @param authored
     */
    public addAuthored(authored: Pack): Observable<this> {
        return this.authored.map(l => l.push(authored))
            .flatMap(() => Observable.of(this));
    }

    /**
     * Remove authored
     *
     * @param authored
     */
    public removeAuthored(authored: Pack): Observable<Pack> {
        return this.authored.map(a => a.indexOf(authored))
            .map(i => i > -1 ? this.$ref.child('authored/' + i).remove() : Observable.of(void 0))
            .flatMap(() => this.authored);
    }

    /**
     * Get authored
     *
     * @return Array<Pack>
     */
    public getAuthored(): FirebaseListObservable<Pack> {
        return this.authored;
    }

    /**
     * Add userPacks
     *
     * @return User
     * @param userPacks
     */
    public addUserPack(userPacks: UserPack): Observable<this> {
        return this.userPacks
            .map(() => this.userPacks.push(userPacks))
            .map(() => this);
    }

    /**
     * Remove userPacks
     *
     * @param userPacks
     */
    public removeUserPack(userPacks: UserPack): Observable<UserPack> {
        return this.userPacks
            .map(up => this.$ref.child('userPacks/' + up.indexOf(userPacks)).remove())
            .flatMap(() => this.userPacks);
    }

    /**
     * Get userPacks
     *
     * @return Array<UserPack>
     */
    public getUserPacks(): FirebaseListObservable<UserPack> {
        return this.userPacks;
    }

    /**
     * Get groups
     *
     * @return Array<Group>
     */
    public getGroups(): Array<Group> {
        return this.groups;
    }

    /**
     * Set devices
     *
     * @return User
     * @param devices
     */
    public setDevices(devices: Array<string>): this {
        this.devices = devices;

        return this;
    }

    /**
     * Get devices
     *
     * @return array
     */
    public getDevices(): Array<string> {
        return this.devices;
    }
}
