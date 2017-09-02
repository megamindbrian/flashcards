import { User } from './User';
import { Pack } from './Pack';
import { DbIdObject } from './DbIdObject';
import { Response } from './Response';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ResponseListFactory, UserObjectFactory } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="user_pack",uniqueConstraints={
 *     @ORM\UniqueConstraint(name="username_idx", columns={"user_id","pack_id"})})
 * @ORM\HasLifecycleCallbacks()
 */
export class UserPack extends DbIdObject<UserPack> {

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="User", inversedBy="userPacks", fetch="EXTRA_LAZY")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */
    protected user_id: string;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="userPacks", fetch="EXTRA_LAZY")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key")
     */
    protected pack_id: string;

    /** @ORM\Column(name="priority", type="decimal") */
    protected priority = 0.0;

    /** @ORM\Column(name="retry_from", type="datetime", nullable=true) */
    protected retryFrom: Date;

    /** @ORM\Column(name="retry_to", type="datetime", nullable=true) */
    protected retryTo: Date;

    /**
     * @ORM\Column(type="datetime", name="downloaded", nullable=true)
     */
    protected downloaded: Date;

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\Column(type="array", name="retention", nullable=true)
     */
    protected retention: any;

    /**
     * @ORM\Column(type="boolean", name="removed")
     */
    protected removed = false;

    /**
     * @return Response[]
     */
    public getResponses(correct = 0): Observable<Array<Response>> {
        const responses: Array<Response> = [];
        return this.getUser()
            .flatMap(user => user.getResponses().map((userResponses: Array<Response>) => {
                const rids = [];
                correct = 0;
                for (const r in userResponses) {
                    if (!userResponses.hasOwnProperty(r)) {
                        continue;
                    }
                    /** @var Response r */
                    if (userResponses[ r ].getCard().getPack().getKey() === this.getPack().getKey()
                        && rids.indexOf(userResponses[ r ].getCard().getKey()) === -1) {
                        rids[ rids.length ] = userResponses[ r ].getCard().getKey();
                        responses[ responses.length ] = userResponses[ r ];
                        if (userResponses[ r ].getCorrect()) {
                            correct++;
                        }
                    }
                }
            }))
            .map(() => responses);
    }

    public getRetention(refresh = false): Array<any> {
        return [];
        /*const intervals = [ 1, 2, 4, 7, 14, 28, 28 * 3, 28 * 6, 7 * 52 ];
         if (typeof this.retention !== 'undefined' && !refresh) {
         return this.retention;
         }
         refresh = true;
         // if a card hasn't been answered, return the next card
         const cards = this.getPack().getCards().filter((c: Card) => {
         return !c.getDeleted();
         });
         const responses = this.getUser().getResponsesForPack(this.getPack());
         const result;
         for (const c in cards) {
         if (!cards.hasOwnProperty(c)) {
         continue;
         }
         /!** @var Card c *!/
         /!** @var Response[] cardResponses *!/
         const cardResponses = responses.matching(Criteria.create().where(Criteria.expr().eq('card', c)));
         cardResponses.sort((r1: Response, r2: Response) => {
         return r1.getCreated().getTime() - r2.getCreated().getTime();
         });
         /!** @var Date lastName *!/
         let last = null;
         let i = 0;
         let correctAfter = false;
         let max = null;
         for (const r in cardResponses) {
         if (!cardResponses.hasOwnProperty(r)) {
         continue;
         }
         const response = cardResponses[ r ];
         if (response.getCorrect()) {
         // If it is in between time intervals ignore the response
         while (i < intervals.length && (last === null || date_time_set(response.getCreated(), 3, 0, 0)
         >= date_time_set(
         date_add(last, new Date('P' + intervals[ i ] + 'D')),
         3,
         0,
         0))) {
         // shift the time interval if answers correctly in the right time frame
         last = response.getCreated();
         i += 1;
         }
         correctAfter = true;
         } else {
         i = 0;
         last = response.getCreated();
         correctAfter = false;
         }
         max = response.getCreated();
         }
         if (i < 0) {
         i = 0;
         }
         if (i > intervals.length - 1) {
         i = intervals.length - 1;
         }
         result[ cards[ c ].getKey() ] = [
         // interval value
         intervals[ i ],
         // lastName interval date
         typeof last !== 'undefined' ? last.format('response') : null,
         // should display on home screen
         typeof last !== 'undefined'
         || (i === 0 && !correctAfter)
         || date_add(date_time_set(last, 3, 0, 0), new Date('P'
         + intervals[ i ]
         + 'D')
         )
         <=
         date_time_set(new Date(), 3, 0, 0),
         // lastName response date for card, used for counting
         typeof max !== 'undefined' ? null : max.format('response')
         ];
         }
         this.retention = result;

         return result;*/
    }

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

    /**
     * Set priority
     *
     * @return UserPack
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
     * Set retryFrom
     *
     * @return UserPack
     * @param retryFrom
     */
    public setRetryFrom(retryFrom: Date): this {
        this.retryFrom = retryFrom;

        return this;
    }

    /**
     * Get retryFrom
     *
     * @return Date
     */
    public getRetryFrom(): Date {
        return this.retryFrom;
    }

    /**
     * Set retryTo
     *
     * @return UserPack
     * @param retryTo
     */
    public setRetryTo(retryTo: Date): this {
        this.retryTo = retryTo;

        return this;
    }

    /**
     * Get retryTo
     *
     * @return Date
     */
    public getRetryTo(): Date {
        return this.retryTo;
    }

    /**
     * Set downloaded
     *
     * @return UserPack
     * @param downloaded
     */
    public setDownloaded(downloaded: Date): this {
        this.downloaded = downloaded;

        return this;
    }

    /**
     * Get downloaded
     *
     * @return Date
     */
    public getDownloaded(): Date {
        return this.downloaded;
    }

    /**
     * Set created
     *
     * @return UserPack
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
     * Set user
     *
     * @return UserPack
     * @param user
     */
    public setUser(user: User): Observable<this> {
        return UserObjectFactory(this.$ref.child('user_id'))
            .map(u => this.$ref.child('user_id').set(user.getKey()))
            .map(() => this);
    }

    /**
     * Get user
     *
     * @return User
     */
    public getUser(): FirebaseObjectObservable<User> {
        return UserObjectFactory(this.$ref.root.child('ss_user/' + this.user_id));
    }

    /**
     * Set pack
     *
     * @return UserPack
     * @param pack
     */
    public setPack(pack: Pack): this {
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
     * Set removed
     *
     *
     * @return UserPack
     * @param removed
     */
    public setRemoved(removed: boolean): this {
        this.removed = removed;

        return this;
    }

    /**
     * Get removed
     *
     * @return boolean
     */
    public getRemoved(): boolean {
        return this.getPack().getStatus() === 'DELETED' ? true : this.removed;
    }

    /**
     * Set retention
     *
     *
     * @return UserPack
     * @param retention
     */
    public setRetention(retention: any): this {
        this.retention = retention;

        return this;
    }
}
