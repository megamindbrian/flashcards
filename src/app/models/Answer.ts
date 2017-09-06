import { Card } from './Card';
import { DbDeletableObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { Response } from './Response';
import { CardCollectionForeignKey, ResponseCollection } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="answer")
 * @ORM\HasLifecycleCallbacks()
 */
export class Answer extends DbDeletableObject<Answer> implements ResponseCollection,
                                                                 CardCollectionForeignKey<Answer> {
    /**
     * @ORM\ManyToOne(targetEntity="Card", inversedBy="answers")
     * @ORM\JoinColumn(name="card_id", referencedColumnName="$key")
     */

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
    public addResponse = (bundle: Response) => Observable.of(this);
    public removeResponse = (bundle: Response) => Observable.of(this);
    public getResponses = () => Observable.of([] as Array<Response>);

    public setCard = (card: Card) => Observable.of(this);
    public getCardId = () => 0;
    public getCard = (): Observable<Card> => Observable.of(void 0 as Card);

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

}
