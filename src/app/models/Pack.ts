import { UserPack } from './UserPack';
import { User } from './User';
import { Card } from './Card';
import { Bundle } from './Bundle';
import { Group } from './Group';
import { File } from './File';
import { DbIdObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { FirebaseListFactory, FirebaseObjectFactory } from '../core/database';

/**
 * @ORM\Entity
 * @ORM\Table(name="pack")
 * @ORM\HasLifecycleCallbacks()
 */
export class Pack extends DbIdObject<Pack> {

    /**
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="packs")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="$key", nullable=true)
     */
    protected group_id: number;

    /**
     * @ORM\ManyToMany(targetEntity="Group")
     * @ORM\JoinTable(name="group_pack",
     *      joinColumns={@ORM\JoinColumn(name="pack_id", referencedColumnName="$key")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="$key")})
     */

    /**
     * @ORM\ManyToMany(targetEntity="Bundle", mappedBy="packs", fetch="EXTRA_LAZY")
     */

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="packs")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key", nullable=true)
     */
    protected user_id: number;

    /**
     * @ORM\OneToMany(targetEntity="UserPack", mappedBy="pack", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /** @ORM\Column(name="properties", type="array", nullable=true) */
    protected properties: { [index: string]: any };

    /** @ORM\Column(name="downloads", type="integer") */
    protected downloads = 0;

    /** @ORM\Column(name="rating", type="decimal") */
    protected rating = 0;

    /** @ORM\Column(name="priority", type="decimal") */
    protected priority = 0;

    /**
     * @ORM\Column(type="datetime", name="active_from", nullable=true)
     */
    protected activeFrom: Date;

    /**
     * @ORM\Column(type="datetime", name="active_to", nullable=true)
     */
    protected activeTo: Date;

    /**
     * @ORM\Column(type="string", length=16, name="status")
     */
    protected status = 'UNPUBLISHED';

    /**
     * @ORM\Column(type="decimal", name="price")
     */
    protected price = 0;

    /**
     * @ORM\Column(type="text", name="title")
     */
    protected title: string;

    /**
     * @ORM\Column(type="text", name="description")
     */
    protected description = '';

    /**
     * @ORM\Column(type="simple_array", name="tags", nullable=true)
     */
    protected tags: Array<string>;

    /**
     * @ORM\OneToMany(targetEntity="Card", mappedBy="pack")
     */

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\Column(type="datetime", name="modified", nullable=true)
     */
    protected modified: Date;
    protected id: number | string;

    public getCreator(): Observable<string> {
        return this.getGroup().map(g => g.getName())
            .flatMap(g => g ? Observable.of(g) : this.getUser().map(u => u.getFirstName() + ' ' + u.getLastName()));
    }

    public setLogo(logo?: File): this {
        this.setProperty('logo', logo.getUrl());
        return this;
    }

    /**
     * @param prop
     * @param value
     */
    public setProperty(prop: string, value: any): this {
        if (prop === 'schedule' && typeof value === 'string') {
            value = new Date(value);
        }
        this.properties[ prop ] = value;
        return this;
    }

    /**
     * @param prop
     * @return null
     */
    public getProperty(prop: string): any {
        if (typeof this.properties[ prop ] !== 'undefined') {
            if (prop === 'schedule' && typeof this.properties[ prop ] === 'string') {
                return new Date(this.properties[ prop ]);
            }

            return this.properties[ prop ];
        }
        return;
    }

    /**
     * @return Array<User>
     */
    public getUsers(): Observable<Array<User>> {
        const users: Observable<Array<User>> = typeof this.getUser()
        !== 'undefined' ? this.getUser().map(u => [ u ]) : Observable.of([]);
        return users.concat(this.getUserPacks()
            .flatMap((userPack: Array<UserPack>) => Observable
                .zip(...userPack
                    .filter((up: UserPack) => !up.getRemoved())
                    .map((up: UserPack) => up.getUser())))
            .toArray())
            .map((upu: Array<User>) => upu.filter((elem: User, pos: number, arr: Array<User>) => {
                return arr.indexOf(elem) === pos;
            }));
    }

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

    public getLogo(): Observable<string> {
        if (typeof this.getProperty('logo') !== 'undefined') {
            return Observable.of(this.getProperty('logo') as string);
        }
        return this.getGroup().map(g => g.getLogo())
            .flatMap(is => typeof is !== 'undefined'
                ? Observable.of(is.getUrl())
                : this.getUser().flatMap(u => u.getPhoto()).map(f => f.getUrl()));
    }

    public isNewForChild(c: User): Observable<boolean> {
        return this.getUserPacks().flatMap(p => Observable.of(true));
        /*
         return this.userPacks.matching(Criteria.create()
         .where(Criteria.expr()
         .eq('user', c))
         .andWhere(Criteria.expr()
         .neq('downloaded', null))
         .andWhere(Criteria.expr()
         .neq('removed', true)))
         .count() === 0 ||
         c.getResponsesForPack(this).matching(Criteria.create()
         .where(Criteria.expr()
         .lte('created', new Date())))
         .count() === 0;
         */
    }

    public getCardCount(): Observable<number> {
        return this.getCards()
            .map(cards => cards
                .filter((c: Card) => !c.getDeleted())
                .length);
    }

    public getChildUsers(user: User): Observable<Array<User>> {
        return Observable.of([]);
        /*
         return user.getInvites().concat(user.getInvites())
         .filter((i: Invite) => {
         return typeof i.getInvitee() !== 'undefined';
         })
         .map((i: Invite) => {
         return i.getInvitee();
         });
         // also return current user and children
         return [user.getInvites()].concat(user.getInvites())
         .filter((i: Invite) => {
         return typeof i.getInvitee() !== 'undefined';
         })
         .map((i: Invite) => {
         return i.getInvitee();
         })
         .filter((u: User) => {
         return (this.getUser() === u && this.getStatus() !== 'DELETED' && this.getStatus() !== 'GROUP'
         && this.getStatus() !== 'PUBLIC') || this.userPacks.matching(Criteria.create()
         .where(Criteria.expr()
         // TODO: should this be or NULL?
         .neq('removed', true))
         .andWhere(Criteria.expr()
         .eq('user', u))).count() > 0
         || this.groups.matching(Criteria.create()
         .where(Criteria.expr()
         .in('name', u.getGroupNames()))).count() > 0 && (this.getStatus()
         === 'GROUP'
         || this.getStatus()
         === 'PUBLIC');
         });
         */
    }

    public getUserById(id: number): Observable<User> {
        return this.getUser()
            .flatMap(u => typeof u !== 'undefined' && u.getId() === id
                ? Observable.of(u)
                : this.getUserPacks()
                    .map(ups => ups.filter(up => up.getUserId() === id)[ 0 ]));
    }

    public getGroupForChild(childUser: User): Observable<Group> {
        return this.getGroups()
            .combineLatest(childUser.getGroupNames(), (groups, childGroups) => ({groups, childGroups}))
            .map(({groups, childGroups}) => groups.filter(g => childGroups.indexOf(g.getName()))[ 0 ]);
    }

    /**
     * @return Card
     */
    public getFirstCard(): Observable<Card> {
        return this.getCards()
            .map(up => up.filter((u: Card) => u.getDeleted() === false)[ 0 ]);
    }

    /**
     * @return UserPack|null
     * @param user
     */
    public getUserPack(user: User): Observable<UserPack> {
        return this.getUserPacks()
            .flatMap(ups => Observable.zip(...ups
                .map((up: UserPack) => up.getUser()
                    .map(u => ({up, u})))))
            .map((ups: Array<{ up: UserPack, u: User }>) => ups
                .filter(({up, u}) => u.getId() === user.getId())[ 0 ].up);
    }

    /**
     * @return UserPack|null
     * @param uid
     */
    // public getUserPackById(uid: number): Observable<UserPack> {
    // return this.userPacks.filter((up: UserPack) => {
    //    return up.getUser().getId() === uid;
    // }).first();
    // }

    /**
     * Set properties
     *
     * @return Pack
     * @param properties
     */
    public setProperties(properties: { [index: string]: any }): this {
        for (const k in properties) {
            if (!properties.hasOwnProperty(k)) {
                continue;
            }
            const v = properties[ k ];
            this.setProperty(k, v);
        }

        return this;
    }

    /**
     * Get properties
     *
     * @return array
     */
    public getProperties(): { [index: string]: any } {
        return this.properties;
    }

    /**
     * Set activeFrom
     *
     * @return Pack
     * @param activeFrom
     */
    public setActiveFrom(activeFrom: Date): this {
        this.activeFrom = activeFrom;

        return this;
    }

    /**
     * Get activeFrom
     *
     * @return Date
     */
    public getActiveFrom(): Date {
        return this.activeFrom;
    }

    /**
     * Set activeTo
     *
     * @return Pack
     * @param activeTo
     */
    public setActiveTo(activeTo: Date): this {
        this.activeTo = activeTo;

        return this;
    }

    /**
     * Get activeTo
     *
     * @return Date
     */
    public getActiveTo(): Date {
        return this.activeTo;
    }

    /**
     * Set status
     *
     * @return Pack
     * @param status
     */
    public setStatus(status: string): this {
        this.status = status;

        return this;
    }

    public getId(): number {
        return this.id as number;
    }

    /**
     * Get status
     *
     * @return string
     */
    public getStatus(): string {
        return this.status;
    }

    /**
     * Set title
     *
     * @return Pack
     * @param title
     */
    public setTitle(title: string): this {
        this.title = title;

        return this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public getTitle(): string {
        return this.title;
    }

    /**
     * Set description
     *
     * @return Pack
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
     * Set tags
     *
     * @return Pack
     * @param tags
     */
    public setTags(tags: Array<string>): this {
        this.tags = tags;

        return this;
    }

    /**
     * Get tags
     *
     * @return string
     */
    public getTags(): Array<string> {
        return this.tags;
    }

    /**
     * Set created
     *
     * @return Pack
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
     * Set modified
     *
     * @return Pack
     * @param modified
     */
    public setModified(modified: Date): this {
        this.modified = modified;

        return this;
    }

    /**
     * Get modified
     *
     * @return Date
     */
    public getModified(): Date {
        return this.modified;
    }

    /**
     * Set group
     *
     * @return Pack
     * @param group
     */
    public setGroup(group?: Group): Observable<this> {
        this.group_id = typeof group !== 'undefined' ? group.getId() : void 0;
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

    public getGroupNames(): Observable<Array<string>> {
        return this.getGroups().map(g => g.map((i: Group) => i.getName()));
    }

    /**
     *
     * @return boolean
     * @param name
     */
    public hasGroup(name: string): Observable<boolean> {
        return this.getGroupNames().map(g => g.indexOf(name) > -1);
    }

    /**
     * Add groups
     *
     * @return this
     * @param group
     */
    public addGroup(group: Group): Observable<this> {
        return this.add('groups', group);
    }

    /**
     * Remove groups
     *
     * @return this|\FOS\UserBundle\Model\GroupableInterface|void
     * @param group
     */
    public removeGroup(group: Group): Observable<this> {
        return this.remove('groups', group);
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
     * Set user
     *
     * @return Pack
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
     * Add cards
     *
     * @return Pack
     * @param card
     */
    public addCard(card: Card): Observable<this> {
        return this.add('cards', card);
    }

    /**
     * Remove cards
     *
     * @param card
     */
    public removeCard(card: Card): Observable<this> {
        return this.remove('cards', card);
    }

    /**
     * Get cards
     *
     * @return Array<Card>
     */
    public getCards(): Observable<Array<Card>> {
        return FirebaseListFactory<Card>(this.$ref.root.child('card'), Card)
            .map((cards: Array<Card>) => cards
                .filter((card: Card) => card.getPackId() === this.getId()))
            // this.list<Card>('cards', ref => FirebaseObjectFactory<Card>(ref, Card))
            .map((c: Array<Card>) => this.getStatus() === 'DELETED'
                ? []
                : c.filter((card: Card) => !card.getDeleted()));
    }

    /**
     * Set downloads
     *
     * @return Pack
     * @param downloads
     */
    public setDownloads(downloads: number): this {
        this.downloads = downloads;

        return this;
    }

    /**
     * Get downloads
     *
     * @return integer
     */
    public getDownloads(): number {
        return this.downloads;
    }

    /**
     * Set rating
     *
     * @return Pack
     * @param rating
     */
    public setRating(rating: number): this {
        this.rating = rating;

        return this;
    }

    /**
     * Get rating
     *
     * @return string
     */
    public getRating(): number {
        return this.rating;
    }

    /**
     * Set priority
     *
     * @return Pack
     * @param priority
     */
    public setPriority(priority: number): this {
        this.priority = priority;

        return this;
    }

    /**
     * Get priority
     *
     * @return string
     */
    public getPriority(): number {
        return this.priority;
    }

    /**
     * Set price
     *
     * @return Pack
     * @param price
     */
    public setPrice(price: number): this {
        this.price = price;

        return this;
    }

    /**
     * Get price
     *
     * @return string
     */
    public getPrice(): number {
        return this.price;
    }

    /**
     * Add userPacks
     *
     * @return Pack
     * @param userPack
     */
    public addUserPack(userPack: UserPack): Observable<this> {
        return this.add('userPacks', userPack);
        /*
         return this.userPacks
         .map(() => this.$ref.child('userPacks').push(userPack))
         .combineLatest(userPack.getUser(), (ups, upu) => ({ups, upu}))
         .flatMap(({ups, upu}) => upu.addUserPack(userPack))
         .map(up => userPack.setRemoved(false))
         .map(() => this);
         */
    }

    /**
     * Remove userPacks
     *
     * @param userPack
     */
    public removeUserPack(userPack: UserPack): Observable<this> {
        return this.remove('userPacks', userPack);
    }

    /**
     * Get userPacks
     *
     * @return Array<UserPack>
     */
    public getUserPacks(): Observable<Array<UserPack>> {
        return this.list<UserPack>('userPacks', ref => FirebaseObjectFactory<UserPack>(ref, UserPack));
    }

    /**
     * Set deleted
     *
     * @return Pack
     * @param deleted
     */
    public setDeleted(deleted: boolean): this {
        this.setStatus(deleted ? 'DELETED' : 'UNPUBLISHED');

        return this;
    }

    /**
     * Get deleted
     *
     * @return boolean
     */
    public getDeleted(): boolean {
        return this.getStatus() === 'DELETED';
    }

    /**
     * Add bundle
     *
     *
     * @return Pack
     * @param bundle
     */
    public addBundle(bundle: Bundle): Observable<this> {
        return this.add('bundles', bundle);
    }

    /**
     * Remove bundle
     *
     * @param bundle
     */
    public removeBundle(bundle: Bundle): Observable<this> {
        return this.remove('bundles', bundle);
    }

    /**
     * Get bundles
     *
     * @return Array<Bundle>
     */
    public getBundles(): Observable<Array<Bundle>> {
        return this.list<Bundle>('payments', ref => FirebaseObjectFactory<Bundle>(ref, Bundle));
    }
}
