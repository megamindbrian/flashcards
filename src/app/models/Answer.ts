import { Card } from './Card';
import { DbIdObject } from './DbIdObject';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Response } from './Response';
import { FirebaseObjectFactory } from '../core/database';

/**
 * @ORM\Entity
 * @ORM\Table(name="answer")
 * @ORM\HasLifecycleCallbacks()
 */
export class Answer extends DbIdObject<Answer> {
    /**
     * @ORM\ManyToOne(targetEntity="Card", inversedBy="answers")
     * @ORM\JoinColumn(name="card_id", referencedColumnName="$key")
     */
    protected card_id: string;

    /**
     * @ORM\Column(type="text", name="content")
     */
    protected content: string;

    /**
     * @ORM\Column(type="text", name="response")
     */
    protected response: string;

    /**
     * @ORM\Column(type="text", name="value")
     */
    protected value: string;

    /**
     * @ORM\Column(type="boolean", name="correct")
     */
    protected correct = false;

    /**
     * @ORM\OneToMany(targetEntity="Response", mappedBy="answer")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected responses: FirebaseListObservable<Array<number>>;

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\Column(type="datetime", name="modified", nullable=true)
     */
    protected modified: Date;

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
     * Set content
     *
     * @return Answer
     * @param content
     */
    public setContent(content: string): this {
        this.content = content;

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
     * Set response
     *
     * @return Answer
     * @param response
     */
    public setResponse(response: string): this {
        this.response = response;

        return this;
    }

    /**
     * Get response
     *
     * @return string
     */
    public getResponse(): string {
        return this.response;
    }

    /**
     * Set value
     *
     * @return Answer
     * @param value
     */
    public setValue(value: string): this {
        this.value = value;
        if (typeof this.content !== 'undefined') {
            this.content = value.replace(/^\^|\s*$|^\s*|\$$/ig, '').replace(/\|/ig, ' or ');
        }
        if (typeof this.response !== 'undefined') {
            this.response = value.replace(/^\^|\s*$|^\s*|\$$/ig, '').replace(/\|/ig, ' or ');
        }

        return this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * Set created
     *
     * @return Answer
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
     * @return Answer
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
     * Add responses
     *
     * @return Answer
     * @param response
     */
    public addResponse(response: Response): Observable<this> {
        return this.add('responses', response);
    }

    /**
     * Remove responses
     *
     * @param response
     */
    public removeResponse(response: Response): Observable<this> {
        return this.remove('responses', response);
    }

    /**
     * Get responses
     *
     * @return Array<Response>
     */
    public getResponses(): Observable<Array<Response>> {
        return this.list('responses', ref => FirebaseObjectFactory<Response>(ref, Response));
    }

    /**
     * Set correct
     *
     * @return Answer
     * @param correct
     */
    public setCorrect(correct: boolean): this {
        this.correct = correct;

        return this;
    }

    /**
     * Get correct
     *
     * @return boolean
     */
    public getCorrect(): boolean {
        return this.correct;
    }

    /**
     * Set card
     *
     * @return Answer
     * @param card
     */
    public setCard(card?: Card): Observable<this> {
        this.card_id = card.getKey();
        return Observable.of(this.$ref.child('card_id').set(this.card_id)).map(() => this);
    }

    /**
     * Get card
     *
     * @return Card
     */
    public getCard(): FirebaseObjectObservable<Card> {
        return FirebaseObjectFactory<Card>(this.$ref.root.child('card/' + this.card_id), Card);
    }

    /**
     * Set deleted
     *
     * @return Answer
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
