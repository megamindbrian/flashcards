import { Answer } from './Answer';
import { Pack } from './Pack';
import { User } from './User';
import { Response } from './Response';
import { DbIdObject } from './DbIdObject';
import { FirebaseListFactory, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * @ORM\Entity
 * @ORM\Table(name="card")
 * @ORM\HasLifecycleCallbacks()
 */
export class Card extends DbIdObject<Card> {
    static SELF_ASSESSMENT = 'SELF_ASSESSMENT';
    static SHORT_ANSWER = 'SHORT_ANSWER';
    static MULTIPLE_CHOICE = 'MULTIPLE_CHOICE';

    /**
     * @ORM\ManyToOne(targetEntity="Pack", inversedBy="cards")
     * @ORM\JoinColumn(name="pack_id", referencedColumnName="$key")
     */
    protected pack: Pack;

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\Column(type="datetime", name="modified", nullable=true)
     */
    protected modified: Date;

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
    protected responses: FirebaseListObservable<Response> = FirebaseListFactory(this.$ref.child('responses'));

    /**
     * @ORM\OneToMany(targetEntity="Answer", mappedBy="card")
     * @ORM\OrderBy({"created" = "DESC"})
     * @var Answer[] answers
     */
    protected answers: FirebaseListObservable<Answer> = FirebaseListFactory(this.$ref.child('answers'));

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */
    protected deleted = false;

    public getResponsesForUser(user: User): Observable<Response> {
        return FirebaseListFactory(this.$ref.child('responses'))
            .map(r => r.filter((response: Response) => response.getUser() === user));
    }

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
        }).first());
    }

    /**
     * @param correct
     */
    public setCorrect(correct?: Answer): Observable<this> {
        return this.answers.map((a: Array<Answer>) => {
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
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        this.created = new Date();
        return this;
    }

    /**
     * Set created
     *
     * @return Card
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
     * @return Card
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

    /**
     * Set pack
     *
     * @return Card
     * @param pack
     */
    public setPack(pack?: Pack): this {
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
     * Add responses
     *
     * @return Card
     * @param responses
     */
    public addResponse(responses: Response): this {
        this.responses.push(responses);

        return this;
    }

    /**
     * Remove response
     *
     * @param response
     */
    public removeResponse(response: Response): Observable<Response> {
        return this.responses.flatMap((r: Array<Response>) => {
            const key = r.indexOf(response);
            if (key > -1) {
                return this.$ref.child('responses/' + key).remove();
            } else {
                return Promise.resolve();
            }
        }).flatMap(() => this.responses);
    }

    /**
     * Get responses
     *
     * @return Array<Response>
     */
    public getResponses(): FirebaseListObservable<Response> {
        return this.responses;
    }

    /**
     * Add answers
     *
     * @return Card
     * @param answers
     */
    public addAnswer(answers: Answer): Observable<this> {
        return this.answers.map((a: Array<Answer>) => {
            if (a.filter(answer => answer.getValue() === answers.getValue()).length === 0) {
                return this.answers.push(answers);
            }
            return Promise.resolve();
        })
            .map(a => answers.setCard(this))
            .map(() => this);
    }

    /**
     * Remove answer
     *
     * @param answer
     */
    public removeAnswer(answer: Answer): Observable<Answer> {
        return this.responses.flatMap(r => {
            if (answer.getResponses().length > 0) {
                // TODO: remove this promise.resolve
                return Promise.resolve(answer.setDeleted(true));
            } else {
                const key = r.indexOf(answer);
                if (key > -1) {
                    return this.$ref.child('answer/' + key).remove();
                } else {
                    return Promise.resolve([]);
                }
            }
        }).flatMap(() => this.answers);
    }

    /**
     * Get answers
     *
     * @return Array<Answer>
     */
    public getAnswers(): FirebaseListObservable<Answer> {
        return this.answers;
    }

    /**
     * Set deleted
     *
     * @return Card
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

}
