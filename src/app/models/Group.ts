import { User } from './User';
import { Pack } from './Pack';
import { Invite } from './Invite';
import { Bundle } from './Bundle';
import { BaseGroup } from './BaseGoup';
import { File } from './File';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
/**
 * @ORM\Entity
 * @ORM\Table(name="ss_group")
 * @ORM\HasLifecycleCallbacks()
 */
export class Group extends BaseGroup {

    /**
     * @ORM\Column(type="string", length=256, name="description")
     */
    protected description = '';

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\OneToMany(targetEntity="Bundle", mappedBy="group", fetch="EXTRA_LAZY")
     */
    protected bundles: Array<Bundle>;

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="group", fetch="EXTRA_LAZY")
     */
    protected invites: Array<Invite>;

    /**
     * @ORM\OneToMany(targetEntity="Pack", mappedBy="group", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected packs: Array<Pack>;

    /**
     * @ORM\ManyToMany(targetEntity="Pack", mappedBy="groups", fetch="EXTRA_LAZY")
     */
    protected groupPacks: FirebaseListObservable<Pack>;

    /**
     * @ORM\ManyToMany(targetEntity="User", mappedBy="groups", fetch="EXTRA_LAZY")
     */
    protected users: Array<User>;

    /**
     * @ORM\ManyToOne(targetEntity="File")
     * @ORM\JoinColumn(name="file_id", referencedColumnName="$key", nullable = true)
     */
    protected logo: File;

    /**
     * @ORM\ManyToOne(targetEntity="Group")
     * @ORM\JoinColumn(name="parent", referencedColumnName="$key", nullable = true)
     */
    protected parent: Group;

    /**
     * @ORM\OneToMany(targetEntity="Group", mappedBy="parent", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected subgroups: Array<Group>;

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */
    protected deleted = false;

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

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
    public getCreated(): Date {
        return this.created;
    }

    public getRoles(): Array<string> {
        return this.roles.filter(r => {
            return typeof r !== 'undefined';
        });
    }

    /**
     * Add users
     *
     * @return Group
     * @param users
     */
    public addUser(users: User): this {
        if (this.getUsers().indexOf(users) === -1) {
            this.getUsers().push(users);
            users.addGroup(this);
        }
        return this;
    }

    /**
     * Remove users
     *
     * @param users
     */
    public removeUser(users: User): Array<User> {
        this.$ref.child('users/' + this.users.indexOf(users)).remove();
        return this.users;
    }

    /**
     * Get users
     *
     * @return Array<User>
     */
    public getUsers(): Array<User> {
        return this.users;
    }

    /**
     * Add packs
     *
     * @return Group
     * @param packs
     */
    public addPack(packs: Pack): this {
        this.packs.push(packs);

        return this;
    }

    /**
     * Remove packs
     *
     * @param packs
     */
    public removePack(packs: Pack): Array<Pack> {
        this.$ref.child('packs/' + this.packs.indexOf(packs)).remove();
        return this.packs;
    }

    /**
     * Get packs
     *
     * @return Array<Pack>
     */
    public getPacks(): Observable<Pack> {
        return this.groupPacks;
    }

    /**
     * Set logo
     *
     * @return Group
     * @param logo
     */
    public setLogo(logo?: File): this {
        this.logo = logo;

        return this;
    }

    /**
     * Get logo
     *
     * @return File
     */
    public getLogo(): File {
        return this.logo;
    }

    /**
     * Set deleted
     *
     * @return Group
     * @param deleted
     */
    public setDeleted(deleted: boolean): this {
        this.deleted = deleted;

        return this;
    }

    /**
     * Get deleted
     *
     * @return boolean
     */
    public getDeleted(): boolean {
        return this.deleted;
    }

    /**
     * Add bundles
     *
     * @return Group
     * @param bundles
     */
    public addBundle(bundles: Bundle): this {
        this.bundles[ this.bundles.length ] = bundles;

        return this;
    }

    /**
     * Remove bundles
     *
     * @param bundles
     */
    public removeBundle(bundles: Bundle): Array<Bundle> {
        this.$ref.child('bundles/' + this.bundles.indexOf(bundles)).remove();
        return this.bundles;
    }

    /**
     * Get bundles
     *
     * @return Array<Bundle>
     */
    public getBundles(): Array<Bundle> {
        return this.bundles;
    }

    /**
     * Add invites
     *
     * @return Group
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

    /**
     * Set parent
     *
     *
     * @return Group
     * @param parent
     */
    public setParent(parent?: Group): this {
        if (typeof parent !== 'undefined' || parent === this) {
            this.$ref.child('parent').remove();
        } else {
            this.parent = parent;
        }
        return this;
    }

    /**
     * Get parent
     *
     * @return Group
     */
    public getParent(): Group {
        return this.parent;
    }

    /**
     * Add subgroup
     *
     *
     * @return Group
     * @param subgroup
     */
    public addSubgroup(subgroup: Group): this {
        this.subgroups[ this.subgroups.length ] = subgroup;

        return this;
    }

    /**
     * Remove subgroup
     *
     * @param subgroup
     */
    public removeSubgroup(subgroup: Group): Array<Group> {
        this.$ref.child('subgroups/' + this.subgroups.indexOf(subgroup)).remove();
        return this.subgroups;
    }

    /**
     * Get subgroups
     *
     * @return Array<Group>
     */
    public getSubgroups(): Array<Group> {
        return this.subgroups;
    }

}
