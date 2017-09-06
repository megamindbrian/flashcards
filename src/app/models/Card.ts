import { Answer } from './Answer';
import { Response } from './Response';
import { DbDeletableObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { AnswerCollection, PackCollectionForeignKey, ResponseCollection } from './Factories';
import { Pack } from './Pack';

/**
 * @ORM\Entity
 * @ORM\Table(name="card")
 * @ORM\HasLifecycleCallbacks()
 */
export class Card extends DbDeletableObject<Card> implements AnswerCollection,
                                                             ResponseCollection,
                                                             PackCollectionForeignKey<Card> {
    static SELF_ASSESSMENT = 'SELF_ASSESSMENT';
    static SHORT_ANSWER = 'SHORT_ANSWER';
    static MULTIPLE_CHOICE = 'MULTIPLE_CHOICE';

    /**
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="cards")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key")
     */

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * @ORM\Column(type="datetime", name="modified", nullable=true)
     */

    /**
     * @ORM\Column(type="text", name="content")
     */
    protected content = '';

    /**
     * @ORM\Column(type="text", name="response_content", nullable=true)
     */
    protected responseContent = '';

    /**
     * @ORM\Column(type="string", length=16, name="content_type")
     */
    protected contentType = ''; // default is TEXT

    /**
     * @ORM\Column(type="string", length=16, name="response_type")
     */
    protected responseType = ''; // default is flash-card

    /**
     * @ORM\Column(type="string", length=16, name="recurrence")
     */
    protected recurrence = ''; // default is 1 day, 2 day 4 day, 1 week, 2 week, 4 week

    /**
     * @ORM\OneToMany(targetEntity="Response", mappedBy="card", fetch="EXTRA_LAZY", indexBy="user")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    /**
     * @ORM\OneToMany(targetEntity="Answer", mappedBy="card")
     * @ORM\OrderBy({"created" = "DESC"})
     * @var Answer[] answers
     */

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */

    public addAnswer = (bundle: Answer) => Observable.of(this);
    public removeAnswer = (bundle: Answer) => Observable.of(this);
    public getAnswers = () => Observable.of([] as Array<Answer>);

    public addResponse = (bundle: Response) => Observable.of(this);
    public removeResponse = (bundle: Response) => Observable.of(this);
    public getResponses = () => Observable.of([] as Array<Response>);

    public setPack = (pack: Pack) => Observable.of(this);
    public getPackId = () => 0;
    public getPack = (): Observable<Pack> => Observable.of(void 0 as Pack);

    public getIndex(): Observable<number> {
        return Observable.of(1);
        // return typeof (this.getPack() !== 'undefined' ? this.getPack().getCards() : Observable.of([]))
        //    .map((c: Array<Card>) => c.filter((card: Card) => !card.getDeleted()).indexOf(this);
        // return this.getPack().flatMap(p => );
    }

    /**
     * @return Answer
     */
    public getCorrect(): Observable<Answer> {
        return this.getAnswers().map(a => a.filter((answer: Answer) => {
            return answer.getCorrect() === true && !answer.getDeleted();
        })[ 0 ]);
    }

    /**
     * @param correct
     */
    public setCorrect(correct?: Answer): Observable<this> {
        return this.getAnswers()
            .map((a: Array<Answer>) => {
                return a.map(answer => {
                    if (answer.getValue() === correct.getValue()) {
                        answer.setCorrect(true);
                        answer.setCard(this);
                        return Observable.of(answer);
                    } else {
                        answer.setCorrect(false);
                        return Observable.of();
                    }
                }).map(answer => {
                    if (typeof answer !== 'undefined') {
                        return this.$ref.child('answers').push(correct);
                    } else {
                        return Observable.of();
                    }
                });
            }).map(() => this);
    }

    public setUpload(newUrl: string): this {
        let content = this.content;
        content = content.replace(/\\n(\\r)?/ig, '\n');
        const hasUrl = (/https:\/\/.*/i).exec(content);
        if (hasUrl !== null) {
            const url = hasUrl[ 0 ].trim();
            content = content.replace(url, '').trim().replace(/\\s*\\n\\r?/ig, '\\n');
        }
        this.content = (typeof newUrl !== 'undefined' ? (newUrl + '\n') : '') + content;
        return this;
    }

    /**
     * Set content
     *
     * @param newContent
     * @return Card
     * @internal param string content
     */
    public setContent(newContent: string): this {
        let content = this.content;
        content = content.replace(/\\n(\\r)?/ig, '\n');
        const matches = (/https:\/\/.*/i).exec(content);
        let url;
        if (matches !== null) {
            url = matches[ 0 ].trim();
        }
        this.content = (typeof url !== 'undefined' ? (url + '\n') : '') + newContent;

        return this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public getContent(): string {
        return this.content;
    }

    /**
     * Set responseContent
     *
     * @return Card
     * @param responseContent
     */
    public setResponseContent(responseContent: string): this {
        this.responseContent = responseContent;

        return this;
    }

    /**
     * Get responseContent
     *
     * @return string
     */
    public getResponseContent(): string {
        return this.responseContent;
    }

    /**
     * Set contentType
     *
     * @return Card
     * @param contentType
     */
    public setContentType(contentType: string): this {
        this.contentType = contentType;

        return this;
    }

    /**
     * Get contentType
     *
     * @return string
     */
    public getContentType(): string {
        return this.contentType;
    }

    /**
     * Set responseType
     *
     * @return Card
     * @param responseType
     */
    public setResponseType(responseType: string): this {
        this.responseType = responseType.split(' ')[ 0 ];

        return this;
    }

    /**
     * Get responseType
     *
     * @return string
     */
    public getResponseType(): string {
        return this.responseType;
    }

    /**
     * Set recurrence
     *
     * @return Card
     * @param recurrence
     */
    public setRecurrence(recurrence: string): this {
        this.recurrence = recurrence;

        return this;
    }

    /**
     * Get recurrence
     *
     * @return string
     */
    public getRecurrence(): string {
        return this.recurrence;
    }

}
