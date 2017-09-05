import { User } from './User';
import { Pack } from './Pack';
import { Invite } from './Invite';
import { Bundle } from './Bundle';
import { BaseGroup } from './BaseGoup';
import { File } from './File';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import {
    BundleCollection, FileCollectionForeignKey, GroupCollection, GroupCollectionForeignKey, InviteCollection,
    PackCollection,
    UserCollection
} from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="ss_group")
 * @ORM\HasLifecycleCallbacks()
 */
export class Group extends BaseGroup implements BundleCollection,
                                                UserCollection,
                                                PackCollection,
                                                InviteCollection,
                                                GroupCollection,
                                                GroupCollectionForeignKey<Group>,
                                                FileCollectionForeignKey<Group> {

    /**
     * @ORM\Column(type="string", length=256, name="description")
     */
    protected description = '';

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * @ORM\OneToMany(targetEntity="Bundle", mappedBy="group", fetch="EXTRA_LAZY")
     */

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="group", fetch="EXTRA_LAZY")
     */

    /**
     * @ORM\OneToMany(targetEntity="Pack", mappedBy="group", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\ManyToMany(targetEntity="Pack", mappedBy="groups", fetch="EXTRA_LAZY")
     */
    protected groupPacks: FirebaseListObservable<Pack>;

    /**
     * @ORM\ManyToMany(targetEntity="User", mappedBy="groups", fetch="EXTRA_LAZY")
     */

    /**
     * @ORM\ManyToOne(targetEntity="File")
     * @ORM\JoinColumn(name="file_id", referencedColumnName="$key", nullable = true)
     */
    protected file_id: number;

    /**
     * @ORM\ManyToOne(targetEntity="Group")
     * @ORM\JoinColumn(name="parent", referencedColumnName="$key", nullable = true)
     */
    protected group_id: number;

    /**
     * @ORM\OneToMany(targetEntity="Group", mappedBy="parent", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */

    addBundle = (bundle: Bundle) => Observable.of(this);
    removeBundle = (bundle: Bundle) => Observable.of(this);
    getBundles = () => Observable.of([] as Array<Bundle>);

    addUser = (bundle: User) => Observable.of(this);
    removeUser = (bundle: User) => Observable.of(this);
    getUsers = () => Observable.of([] as Array<User>);

    addPack = (bundle: Pack) => Observable.of(this);
    removePack = (bundle: Pack) => Observable.of(this);
    getPacks = () => Observable.of([] as Array<Pack>);

    addInvite = (bundle: Invite) => Observable.of(this);
    removeInvite = (bundle: Invite) => Observable.of(this);
    getInvites = () => Observable.of([] as Array<Invite>);

    addGroup = (bundle: Group) => Observable.of(this);
    removeGroup = (bundle: Group) => Observable.of(this);
    getGroups = () => Observable.of([] as Array<Group>);

    setGroup = (bundle: Group) => Observable.of(this);
    getGroupId = () => 0;
    getGroup = () => Observable.of(void 0 as Group);

    setFile = (file: File) => Observable.of(this);
    getFileId = () => 0;
    getFile = () => Observable.of(void 0 as File);

    /**
     * Set description
     *
     * @return Group
     * @param description
     */
    public setDescription(description: string): this {
        this.description = description;

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
     * Set created
     *
     * @return Group
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

    public getRoles(): Array<string> {
        return this.roles.filter(r => {
            return typeof r !== 'undefined';
        });
    }

    /**
     * Add groupPack
     *
     * @return Group
     * @param groupPack
     */
    public addGroupPack(groupPack: Pack): Observable<this> {
        return this.groupPacks
            .map(g => g.indexOf(groupPack) === -1 ? this.groupPacks.push(groupPack) : Observable.of(void 0))
            .map(() => this);
    }

    /**
     * Remove groupPacks
     *
     * @param pack
     */
    public removeGroupPack(pack: Pack): Observable<Pack> {
        return this.groupPacks.map(g => g.indexOf(pack))
            .map(i => i > -1 ? this.$ref.child('groupPacks/' + i).remove() : Observable.of(void 0))
            .flatMap(() => this.groupPacks);
    }

    /**
     * Get groupPacks
     *
     * @return Array<Pack>
     */
    public getGroupPacks(): Observable<Pack> {
        return this.groupPacks;
    }

}
