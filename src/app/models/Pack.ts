import { UserPack } from './UserPack';
import { User } from './User';
import { Card } from './Card';
import { Bundle } from './Bundle';
import { Group } from './Group';
import { File } from './File';
import { DbPropertiesObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import {
    BundleCollection, GroupCollectionForeignKey, UserCollection, UserCollectionForeignKey,
    UserPackCollection
} from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="pack")
 * @ORM\HasLifecycleCallbacks()
 */
export class Pack extends DbPropertiesObject<Pack> implements GroupCollectionForeignKey<Pack>,
                                                              UserCollectionForeignKey<Pack>,
                                                              BundleCollection,
                                                              UserPackCollection,
                                                              UserCollection {

    /**
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="packs")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="$key", nullable=true)
     */

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

    /**
     * @ORM\OneToMany(targetEntity="UserPack", mappedBy="pack", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /** @ORM\Column(name="properties", type="array", nullable=true) */

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

    /**
     * @ORM\Column(type="datetime", name="modified", nullable=true)
     */

    public addBundle = (bundle: Bundle) => Observable.of(this);
    public removeBundle = (bundle: Bundle) => Observable.of(this);
    public getBundles = () => Observable.of([] as Array<Bundle>);

    public addCard = (bundle: Card) => Observable.of(this);
    public removeCard = (bundle: Card) => Observable.of(this);
    public getCards = () => Observable.of([] as Array<Card>);

    public addGroup = (bundle: Group) => Observable.of(this);
    public removeGroup = (bundle: Group) => Observable.of(this);
    public getGroups = () => Observable.of([] as Array<Group>);

    public addUserPack = (bundle: UserPack) => Observable.of(this);
    public removeUserPack = (bundle: UserPack) => Observable.of(this);
    public getUserPacks = () => Observable.of([] as Array<UserPack>);

    public addUser = (bundle: User) => Observable.of(this);
    public removeUser = (bundle: User) => Observable.of(this);
    public getUsers = () => Observable.of([] as Array<User>);

    public setGroup = (group?: Group) => this.setFk<Group>('group_id', group);
    public getGroupId = () => this.getFkId<Group>('group_id');
    public getGroup = (): Observable<Group> => this.getFk<Group>('group_id', Group);

    public setUser = (user?: User) => this.setFk<User>('user_id', user);
    public getUserId = () => this.getFkId<User>('user_id');
    public getUser = (): Observable<User> => this.getFk<User>('user_id', User);

    public getCreator(): Observable<string> {
        return this.getGroup().map(g => g.getName())
            .flatMap(g => g ? Observable.of(g) : this.getUser().map(u => u.getFirstName() + ' ' + u.getLastName()));
    }

    public setLogo(logo?: File): this {
        this.setProperty('logo', logo.getUrl());
        return this;
    }

    /**
     * @return Array<User>
     */

    /*
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
*/

    public getLogo(): Observable<string> {
        if (typeof this.getProperty('logo') !== 'undefined') {
            return Observable.of(this.getProperty('logo') as string);
        }
        return this.getGroup()
            .flatMap((g: Group) => typeof g !== 'undefined'
                ? g.getFile()
                : Observable.of(void 0))
            .flatMap(is => typeof is !== 'undefined'
                ? Observable.of(is.getUrl())
                : this.getUser()
                    .flatMap((u: User) => typeof u !== 'undefined'
                        ? u.getFile()
                        : Observable.of(void 0))
                    .map(f => typeof f !== 'undefined' ?
                        f.getUrl()
                        : void 0));
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
     * @param uid
     */
    // public getUserPackById(uid: number): Observable<UserPack> {
    // return this.userPacks.filter((up: UserPack) => {
    //    return up.getUser().getId() === uid;
    // }).first();
    // }

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
     * Get cards
     *
     * @return Array<Card>
     */

    /*
    public getCards(): Observable<Array<Card>> {
        return FirebaseListFactory<Card>(this.$ref.root.child('card'), Card)
            .map((cards: Array<Card>) => cards
                .filter((card: Card) => card.getPackId() === this.getId()))
            // this.list<Card>('cards', ref => FirebaseObjectFactory<Card>(ref, Card))
            .map((c: Array<Card>) => this.getStatus() === 'DELETED'
                ? []
                : c.filter((card: Card) => !card.getDeleted()));
    }
*/
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

    /*
public addUserPack(userPack: UserPack): Observable<this> {
    return this.add('userPacks', userPack);
     return this.userPacks
     .map(() => this.$ref.child('userPacks').push(userPack))
     .combineLatest(userPack.getUser(), (ups, upu) => ({ups, upu}))
     .flatMap(({ups, upu}) => upu.addUserPack(userPack))
     .map(up => userPack.setRemoved(false))
     .map(() => this);
    }
     */

}
