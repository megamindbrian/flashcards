import { User } from './User';
import { Pack } from './Pack';
import { DbIdObject } from './DbIdObject';
import { Response } from './Response';
import { Observable } from 'rxjs/Observable';
import { FirebaseListFactory, FirebaseObjectFactory } from '../core/database';
import { Card } from './Card';

export class RetentionValue {
    days: number;
    lastInterval: Date;
    lastAnswered: Date;
    shouldDisplay: boolean;
    cardId: number;
}

/**
 * @ORM\Entity
 * @ORM\Table(name="user_pack",uniqueConstraints={
 *     @ORM\UniqueConstraint(name="username_idx", columns={"user_id","pack_id"})})
 * @ORM\HasLifecycleCallbacks()
 */
export class UserPack extends DbIdObject<UserPack> {
    static INTERVALS = [ 1, 2, 4, 7, 14, 28, 28 * 3, 28 * 6, 7 * 52 ];

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="User", inversedBy="userPacks", fetch="EXTRA_LAZY")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */
    protected user_id: number;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="userPacks", fetch="EXTRA_LAZY")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key")
     */
    protected pack_id: number;

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
    protected removed: number | boolean = false;

    /**
     * cut off time at 3:00 am, this prevents the card from reappearing on the home screen right at midnight
     * @param input
     * @param interval
     * @returns {Date}
     */
    private static normalizeTimeAt3(input: Date, interval = 0): Date {
        const lastPlusInterval = new Date(input);
        lastPlusInterval.setHours(3, 0, 0);
        lastPlusInterval.setDate(lastPlusInterval.getDate() + interval);
        return lastPlusInterval;
    }

    /**
     * Reducer function for the list of responses
     * @param reducer
     * @param current
     * @returns {{i: number, last: Date, max: Date, correct: boolean}}
     */
    private static responseToInterval(reducer: { i: number, last: Date, max: Date, correct: boolean },
                                      current: Response): { i: number, last: Date, max: Date, correct: boolean } {
        if (current.getCorrect()) {
            // if answers correctly in between time intervals ignore the response
            //           |wrong              |<-next interval starts here
            // timeline ----------------------->
            //             |correct |correct |correct
            while (reducer.i < UserPack.INTERVALS.length && (typeof reducer.last === 'undefined'
            || UserPack.normalizeTimeAt3(current.getCreated())
            >= UserPack.normalizeTimeAt3(reducer.last, UserPack.INTERVALS[ reducer.i ]))) {
                reducer.last = current.getCreated();
                reducer.i += 1;
            }
            reducer.correct = true;
        } else {
            reducer.i = 0;
            reducer.last = current.getCreated();
            reducer.correct = false;
        }
        reducer.max = current.getCreated();
        return reducer;
    }

    /**
     * Input is a list of response objects for a card,
     * - output is the current interval (days),
     * - the lastInterval is the last time they answered on schedule
     * - shouldDisplay means the user hasn't answered, they answered incorrectly,
     *    or the interval is up and they need to answer again.
     * - lastAnswered is the max of the last time it was answered
     * @param cardId
     * @param cardResponses
     * @returns {{days: number, lastInterval: Date, shouldDisplay: boolean, lastAnswered: Date, cardId: number}}
     */
    private static calculateRetention(cardId: number, cardResponses: Array<Response>): RetentionValue {
        const retention = cardResponses
            .reduce(UserPack.responseToInterval, {
                last: void 0,
                i: 0,
                correct: false,
                max: void 0
            });
        Object.assign(retention, {i: Math.min(UserPack.INTERVALS.length, Math.max(0, retention.i))});
        return {
            // interval value
            days: UserPack.INTERVALS[ retention.i ],
            // last interval date
            lastInterval: retention.last,
            // should display on home screen
            shouldDisplay: typeof retention.last === 'undefined'
            || (retention.i === 0 && !retention.correct)
            || UserPack.normalizeTimeAt3(retention.last, UserPack.INTERVALS[ retention.i ])
            <= UserPack.normalizeTimeAt3(new Date()),
            // lastName response date for card, used for counting
            lastAnswered: retention.max,
            cardId
        };
    }

    /**
     * always sort responses based on creation date, oldest to latest makes it easy to pop() the latest
     * @param r1
     * @param r2
     * @returns {number}
     */
    private static sortResponse(r1: Response, r2: Response): number {
        return r1.getCreated().getTime() - r2.getCreated().getTime();
    }

    /**
     * @return Response[]
     */
    public getResponses(correct = 0): Observable<Array<Response>> {
        const responses: Array<Response> = [];
        return Observable.of(responses);
        /*
         return this.getUser()
         .flatMap(user => user.getResponses().map((userResponses: Array<Response>) => {
         const rids = [];
         correct = 0;
         for (const r in userResponses) {
         if (!userResponses.hasOwnProperty(r)) {
         continue;
         }
         if (userResponses[ r ].getCard().getPack().getId() === this.getPack().getId()
         && rids.indexOf(userResponses[ r ].getCard().getId()) === -1) {
         rids[ rids.length ] = userResponses[ r ].getCard().getId();
         responses[ responses.length ] = userResponses[ r ];
         if (userResponses[ r ].getCorrect()) {
         correct++;
         }
         }
         }
         }))
         .map(() => responses);
         */
    }

    /**
     * Take a list of responses and calculate the retention values for the current date
     *
     * @param refresh
     * @returns {any}
     */
    public getRetention(refresh = false): Observable<Array<RetentionValue>> {
        if (typeof this.retention !== 'undefined' && typeof this.retention !== 'string' && !refresh) {
            return Observable.of(this.retention);
        }
        refresh = true;
        // stream all the data we need
        return this.getPack()
            .combineLatest(this.getUser(), (pack, user) => ({pack, user}))
            // collect cards
            .flatMap(({pack, user}) => pack.getCards().map(cards => ({cards, pack, user})))
            // collect pack responses
            .flatMap(({cards, pack, user}: { cards: Array<Card>, pack: Pack, user: User }) => {
                if (pack.getId() + '' === '5') {
                    console.log(cards);
                }
                const cardIds: Array<number> = cards.map(card => card.getId());
                return user.getResponses()
                    .map((r: Array<Response>) => r
                        .filter(response => cardIds.indexOf(response.getCardId()) > -1))
                    .map((r: Array<Response>) => r
                        .sort(UserPack.sortResponse))
                    .map(responses => ({responses, cards, pack, user}));
            })
            // calculate retention score for every card in the pack
            .map(({responses, cards, pack, user}) => (this.retention = cards.map((card: Card) => {
                const cardResponses = responses
                    .filter(response => response.getCardId() === card.getId())
                    .sort(UserPack.sortResponse);
                return UserPack.calculateRetention(card.getId(), cardResponses);
            })));
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
        this.user_id = typeof user !== 'undefined' ? user.getId() : void 0;
        return Observable.of(this.$ref.child('user_id').set(this.user_id)).map(() => this);
    }

    public getUserId(): number {
        return this.user_id;
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
     * Set pack
     *
     * @return UserPack
     * @param pack
     */
    public setPack(pack: Pack): Observable<this> {
        this.pack_id = pack.getId();
        return Observable.of(this.$ref.child('pack_id').set(this.pack_id)).map(() => this);
    }

    /**
     * Get pack
     *
     * @return Pack
     */
    public getPack(): Observable<Pack> {
        return FirebaseListFactory<Pack>(this.$ref.root.child('pack'), Pack)
            .map(ups => ups.filter((pack: Pack) => pack.getId() === this.pack_id)[ 0 ]);
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
    public getRemoved(): Observable<boolean> {
        return Observable.of(this.removed === true || this.removed > 0)
            .flatMap(is => is
                ? Observable.of(true)
                : this.getPack().map((p: Pack) => typeof p === 'undefined'
                || p === null || p.getStatus() === 'DELETED'));
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
