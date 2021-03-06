import { Payment } from './Payment';
import { Visit } from './Visit';
import { UserPack } from './UserPack';
import { BaseUser } from './BaseUser';
import { Response } from './Response';
import { File } from './File';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import {
    FileCollection, FileCollectionForeignKey,
    InviteCollection, InviteeCollection, PackCollection, PaymentCollection, ResponseCollection, UserPackCollection,
    VisitCollection
} from './Factories';
import { Invite } from './Invite';
import { Pack } from './Pack';

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

export class User extends BaseUser implements VisitCollection,
                                              ResponseCollection,
                                              InviteeCollection,
                                              InviteCollection,
                                              UserPackCollection,
                                              PackCollection,
                                              FileCollection,
                                              FileCollectionForeignKey<User>,
                                              PaymentCollection {

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

    /**
     * @ORM\Column(type="datetime", name="last_visit", nullable = true)
     */
    protected last_visit: Date;

    /**
     * @ORM\Column(type="string", length=256, name="firstName")
     */
    protected first = '';

    /**
     * @ORM\Column(type="string", length=256, name="lastName")
     */
    protected last = '';

    /**
     * @ORM\OneToOne(targetEntity="File")
     * @ORM\JoinColumn(name="file_id", referencedColumnName="$key", nullable = true)
     */

    /** @ORM\Column(name="devices", type="simple_array", nullable=true) */
    protected devices: Array<string>;

    /**
     * @ORM\ManyToMany(targetEntity="Group")
     * @ORM\JoinTable(name="ss_user_group",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="$key")})
     */

    /** @ORM\Column(name="properties", type="array", nullable=true) */

    public addInvite = (item: Invite) => this.add('invites', item);
    public removeInvite = (item: Invite) => this.remove('invites', item);
    public getInvites = (): Observable<Array<Invite>> => this.list('invite', 'user_id', Invite);

    public addInvitee = (item: Invite) => this.add('invitees', item);
    public removeInvitee = (item: Invite) => this.remove('invitees', item);
    public getInvitees = (): Observable<Array<Invite>> => this.list('invite', 'invitee_id', Invite);

    public addVisit = (item: Visit) => this.add('visits', item);
    public removeVisit = (item: Visit) => this.remove('visits', item);
    public getVisits = (): Observable<Array<Visit>> => this.list('visit', 'user_id', Visit);

    public addResponse = (item: Response) => this.add('responses', item);
    public removeResponse = (item: Response) => this.remove('responses', item);
    public getResponses = (): Observable<Array<Response>> => this.list('response', 'user_id', Response);

    public addUserPack = (userPack: UserPack) => this.add('userPacks', userPack);
    public removeUserPack = (userPack: UserPack) => this.remove('userPacks', userPack);
    public getUserPacks = (): Observable<Array<UserPack>> => this.list('user_pack', 'user_id', UserPack);

    public addPack = (pack: Pack) => this.add('packs', pack);
    public removePack = (pack: Pack) => this.remove('packs', pack);
    public getPacks = (): Observable<Array<Pack>> => this.list('pack', 'user_id', Pack);

    public addFile = (item: File) => this.add('files', item);
    public removeFile = (item: File) => this.remove('files', item);
    public getFiles = (): Observable<Array<File>> => this.list('file', 'user_id', File);

    public addPayment = (item: Payment) => this.add('payments', item);
    public removePayment = (item: Payment) => this.remove('payments', item);
    public getPayments = (): Observable<Array<Payment>> => this.list('payment', 'user_id', Payment);

    public setFile = (file?: File) => this.setFk<File>('file_id', file);
    public getFileId = () => this.getFkId<File>('file_id');
    public getFile = (): Observable<File> => this.getFk<File>('file_id', File);

    /**
     * @return Invite|User
     */
    public getParent(): Observable<User> {
        // purchase with parent account
        const username = this.getUsername();
        return this.getInvitees()
            .flatMap((invitees: Array<Invite>) => Observable.zip(...invitees
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

    /**
     * @param prop
     * @return null
     */

    /**
     * @return Array<Pack>
     */
    public getAllPacks(): Observable<Array<Pack>> {
        const userPacks = this.getUserPacks()
            .flatMap((ups: Array<UserPack>) => Observable.zip(...ups
                .map(up => up.getPack()
                    .map(p => ({p, up})))))
            .map((ups: Array<{ p: Pack, up: UserPack }>) => ups
                .filter(({p, up}) => !p.getDeleted() && !up.getDeleted())
                .map(({p, up}) => p));
        return Observable.zip(this.getPacks(), userPacks)
            .map(ps => [].concat(...ps))
            .map(p => {
                const ids = p.map((pack: Pack) => pack.getId());
                return p
                    .filter((elem: Pack, pos: number, arr: Array<Pack>) => {
                        return !elem.getDeleted() && ids.indexOf(elem.getId()) === pos;
                    });
            });
    }

    /**
     * Set firstName
     *
     * @return User
     * @param first
     */
    public setFirstName(first: string): this {
        this.first = first;

        return this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public getFirstName(): string {
        return this.first;
    }

    /**
     * Set lastName
     *
     * @return User
     * @param last
     */
    public setLastName(last: string): this {
        this.last = last;

        return this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public getLastName(): string {
        return this.last;
    }

    /**
     * Set lastVisit
     *
     * @return User
     * @param lastVisit
     */
    public setLastVisit(lastVisit: Date): this {
        this.last_visit = lastVisit;

        return this;
    }

    /**
     * Get lastVisit
     *
     * @return Date
     */
    public getLastVisit(): Date {
        return this.last_visit;
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
