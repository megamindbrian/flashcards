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

    /**
     * @ORM\ManyToOne(targetEntity="Group")
     * @ORM\JoinColumn(name="parent", referencedColumnName="$key", nullable = true)
     */

    /**
     * @ORM\OneToMany(targetEntity="Group", mappedBy="parent", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */

    public addBundle = (item: Bundle) => this.add('bundles', item);
    public removeBundle = (item: Bundle) => this.remove('bundles', item);
    public getBundles = (): Observable<Array<Bundle>> => this.list('bundle', 'group_id', Bundle);

    public addUser = (item: User) => this.add('users', item);
    public removeUser = (item: User) => this.remove('users', item);
    public getUsers = (): Observable<Array<User>> => this.list('user', 'group_id', User);

    public addPack = (item: Pack) => this.add('packs', item);
    public removePack = (item: Pack) => this.remove('packs', item);
    public getPacks = (): Observable<Array<Pack>> => this.list('pack', 'group_id', Pack);

    public addInvite = (item: Invite) => this.add('invites', item);
    public removeInvite = (item: Invite) => this.remove('invites', item);
    public getInvites = (): Observable<Array<Invite>> => this.list('invite', 'group_id', Invite);

    // parent child relationship
    public addGroup = (item: Group) => this.add('groups', item);
    public removeGroup = (item: Group) => this.remove('groups', item);
    public getGroups = (): Observable<Array<Group>> => this.list('group', 'group_id', Group);

    public setGroup = (item?: Group) => this.setFk<Group>('group_id', item);
    public getGroupId = () => this.getFkId<Group>('group_id');
    public getGroup = (): Observable<Group> => this.getFk<Group>('group_id', Group);

    public setFile = (item?: File) => this.setFk<File>('file_id', item);
    public getFileId = () => this.getFkId<File>('file_id');
    public getFile = (): Observable<File> => this.getFk<File>('file_id', File);

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

    public getLogo(): Observable<string> {
        return this.getFile()
            .flatMap(is => typeof is !== 'undefined' && is !== null
                ? Observable.of(is.getUrl())
                : Observable.of(void 0));
    }

}
