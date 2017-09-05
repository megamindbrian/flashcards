import { Card } from './Card';
import { DbDeletableObject } from './DbIdObject';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Response } from './Response';
import { FirebaseObjectFactory } from '../core/database';
import { ResponseCollection } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="answer")
 * @ORM\HasLifecycleCallbacks()
 */
export class Answer extends DbDeletableObject<Answer> implements ResponseCollection {
    /**
     * @ORM\ManyToOne(targetEntity="Card", inversedBy="answers")
     * @ORM\JoinColumn(name="card_id", referencedColumnName="$key")
     */
    protected card_id: number;

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

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * @ORM\Column(type="datetime", name="modified", nullable=true)
     */

    /**
     * @ORM\Column(type="boolean", name="deleted")
     */
    addResponse = (bundle: Response) => Observable.of(this);
    removeResponse = (bundle: Response) => Observable.of(this);
    getResponses = () => Observable.of([] as Array<Response>);

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
        this.card_id = card.getId();
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
}
