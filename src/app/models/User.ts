import { Group } from './Group';
import { Pack } from './Pack';
import { Payment } from './Payment';
import { Visit } from './Visit';
import { Invite } from './Invite';
import { UserPack } from './UserPack';
import { BaseUser } from './BaseUser';
import { Response } from './Response';
import { File } from './File';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactory } from '../core/database';

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

    /**
     * @ORM\OneToMany(targetEntity="Visit", mappedBy="user", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="invitee")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\OneToMany(targetEntity="Pack", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\OneToMany(targetEntity="UserPack", mappedBy="user", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\OneToMany(targetEntity="File", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\OneToMany(targetEntity="Response", mappedBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */

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
    protected file_id: string;

    /** @ORM\Column(name="devices", type="simple_array", nullable=true) */
    protected devices: Array<string>;

    /**
     * @ORM\ManyToMany(targetEntity="Group")
     * @ORM\JoinTable(name="ss_user_group",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="$key")})
     */

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
    public getParent(): Observable<User> {
        // purchase with parent account
        const username = this.getUsername();
        return this.getInvitees()
            .flatMap((invitees: Array<Invite>) => Observable.forkJoin(invitees
                .map(i => i.getUser().map(user => ({user, i})))))
            .map(userInvitees => userInvitees
                .filter(({user, i}) => username.substr(0, user.getUsername().length + 1) === user.getUsername() + '_'))
            .map(parents => parents.length > 0 ? parents[ 0 ].user : this);

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

    /**
     * @return Array<Pack>
     */
    public getPacks(): Observable<Array<Pack>> {
        const userPacks = this.getUserPacks()
            .flatMap(ups => Observable.forkJoin(ups
                .map(up => up.getPack()
                    .map(p => ({p, up})))))
            .map((ups: Array<{ p: Pack, up: UserPack }>) => ups
                .filter(({p, up}) => up.getRemoved())
                .map(({p, up}) => p));
        return this.getAuthored()
            .combineLatest(userPacks, (packs, ups) => ({packs, ups}))
            .map(({packs, ups}) => packs.concat(ups))
            .map(p => p
                .filter((elem: Pack, pos: number, arr: Array<Pack>) => {
                    return arr.indexOf(elem) === pos;
                }));
    }

    /**
     * @return UserPack|null
     * @param pack
     */
    public getUserPack(pack: Pack): Observable<UserPack> {
        return this.getUserPacks()
            .flatMap(userPacks => Observable.forkJoin(userPacks
                .map(up => up.getPack().map(p => ({p, up})))))
            .map(upp => upp.map(up => up as { p: Pack, up: UserPack }))
            .map(upp => upp.filter(({p, up}) => p.getKey() === pack.getKey())[ 0 ].up);
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
     * @param payment
     */
    public addPayment(payment: Payment): Observable<this> {
        return this.add('payments', payment);
    }

    /**
     * Remove payments
     *
     * @param payment
     */
    public removePayment(payment: Payment): Observable<this> {
        return this.remove('payments', payment);
    }

    /**
     * Get payments
     *
     * @return Array<Payment>
     */
    public getPayments(): Observable<Array<Payment>> {
        return this.list('payments', ref => FirebaseObjectFactory(ref, Payment));
    }

    /**
     * Add visits
     *
     * @return User
     * @param visit
     */
    public addVisit(visit: Visit): Observable<this> {
        return this.add('visits', visit);
    }

    /**
     * Remove visits
     *
     * @param visit
     */
    public removeVisit(visit: Visit): Observable<this> {
        return this.remove('visits', visit);
    }

    /**
     * Get visits
     *
     * @return Array<Visit>
     */
    public getVisits(): Observable<Array<Visit>> {
        return this.list('visits', ref => FirebaseObjectFactory<Visit>(ref, Visit));
    }

    /**
     * Add files
     *
     * @return User
     * @param file
     */
    public addFile(file: File): Observable<this> {
        return this.add('files', file);
    }

    /**
     * Remove files
     *
     * @param file
     */
    public removeFile(file: File): Observable<this> {
        return this.remove('files', file);
    }

    /**
     * Get files
     *
     * @return Array<File>
     */
    public getFiles(): Observable<Array<File>> {
        return this.list('files', ref => FirebaseObjectFactory<File>(ref, File));
    }

    /**
     * Set photo
     *
     * @return User
     * @param photo
     */
    public setPhoto(photo?: File): Observable<this> {
        this.file_id = photo.getKey();
        return Observable.of(this.$ref.child('file_id').set(this.file_id)).map(() => this);
    }

    /**
     * Get photo
     *
     * @return File
     */
    public getPhoto(): Observable<File> {
        return FirebaseObjectFactory<File>(this.$ref.root.child('file/' + this.file_id), File);
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
     * @param invite
     */
    public addInvite(invite: Invite): Observable<this> {
        return this.add('invites', invite);
    }

    /**
     * Remove invites
     *
     * @param invite
     */
    public removeInvite(invite: Invite): Observable<this> {
        return this.remove('invites', invite);
    }

    /**
     * Get invites
     *
     * @return Array<Invite>
     */
    public getInvites(): Observable<Array<Invite>> {
        return this.list('invites', ref => FirebaseObjectFactory(ref, Invite));
    }

    /**
     * Add invitees
     *
     * @return User
     * @param invitee
     */
    public addInvitee(invitee: Invite): Observable<this> {
        return this.add('invitees', invitee);
    }

    /**
     * Remove invitees
     *
     * @param invitee
     */
    public removeInvitee(invitee: Invite): Observable<this> {
        return this.remove('invitees', invitee);
    }

    /**
     * Get invitees
     *
     * @return Array<Invite>
     */
    public getInvitees(): Observable<Array<Invite>> {
        return this.list('invitees', ref => FirebaseObjectFactory(ref, Invite));
    }

    /**
     * Add responses
     *
     * @return User
     * @param response
     */
    public addResponse(response: Response): Observable<this> {
        return this.add('responses', response);
    }

    /**
     * Remove responses
     *
     * @param response
     */
    public removeResponse(response: Response): Observable<this> {
        return this.remove('responses', response);
    }

    /**
     * Get responses
     *
     * @return Array<Response>
     */
    public getResponses(): Observable<Array<Response>> {
        return this.list('responses', ref => FirebaseObjectFactory(ref, Response));
    }

    /**
     * Add authored
     *
     * @return User
     * @param authored
     */
    public addAuthored(authored: Pack): Observable<this> {
        return this.add('authored', authored);
    }

    /**
     * Remove authored
     *
     * @param authored
     */
    public removeAuthored(authored: Pack): Observable<this> {
        return this.remove('authored', authored);
    }

    /**
     * Get authored
     *
     * @return Array<Pack>
     */
    public getAuthored(): Observable<Array<Pack>> {
        return this.list('authored', ref => FirebaseObjectFactory(ref, Pack));
    }

    /**
     * Add userPacks
     *
     * @return User
     * @param userPacks
     */
    public addUserPack(userPacks: UserPack): Observable<this> {
        return this.add('userPacks', userPacks);
    }

    /**
     * Remove userPacks
     *
     * @param userPacks
     */
    public removeUserPack(userPacks: UserPack): Observable<this> {
        return this.remove('userPacks', userPacks);
    }

    /**
     * Get userPacks
     *
     * @return Array<UserPack>
     */
    public getUserPacks(): Observable<Array<UserPack>> {
        return this.list('userPacks', ref => FirebaseObjectFactory<UserPack>(ref, UserPack));
    }

    /**
     * Get groups
     *
     * @return Array<Group>
     */
    public getGroups(): Observable<Array<Group>> {
        return this.list('groups', ref => FirebaseObjectFactory<Group>(ref, Group));
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
