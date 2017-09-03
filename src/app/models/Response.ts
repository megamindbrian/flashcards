import { Card } from './Card';
import { Answer } from './Answer';
import { User } from './User';
import { File } from './File';
import { DbIdObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactory } from '../core/database';
/**
 * @ORM\Entity
 * @ORM\Table(name="response")
 * @ORM\HasLifecycleCallbacks()
 */
export class Response extends DbIdObject<Response> {

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    protected created: Date;

    /**
     * @ORM\ManyToOne(targetEntity="Card", inversedBy="responses")
     * @ORM\JoinColumn(name="card_id", referencedColumnName="$key", nullable=true)
     */
    protected card_id: string;

    /**
     * @ORM\ManyToOne(targetEntity="Answer", inversedBy="responses")
     * @ORM\JoinColumn(name="answer_id", referencedColumnName="$key", nullable=true)
     */
    protected answer_id: string;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="responses")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */
    protected user_id: string;

    /**
     * @ORM\OneToOne(targetEntity="File", inversedBy="response")
     * @ORM\JoinColumn(name="file_id", referencedColumnName="$key", nullable=true)
     */
    protected file_id: string;

    /**
     * @ORM\Column(type="text", name="value", nullable=true)
     */
    protected value: string;

    /**
     * @ORM\Column(type="boolean", name="correct")
     */
    protected correct: boolean;

    /**
     * @ORM\PrePersist
     */
    public setCreatedValue(): this {
        if (this.created === null) {
            this.created = new Date();
        }

        return this;
    }

    /**
     * Set created
     *
     * @return Response
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
     * Set value
     *
     * @return Response
     * @param value
     */
    public setValue(value: string): this {
        this.value = value;

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
     * Set answer
     *
     * @return Response
     * @param answer
     */
    public setAnswer(answer?: Answer): Observable<this> {
        this.answer_id = answer.getKey();
        return Observable.of(this.$ref.child('answer_id').set(this.answer_id)).map(() => this);
    }

    /**
     * Get answer
     *
     * @return Answer
     */
    public getAnswer(): Observable<Answer> {
        return FirebaseObjectFactory<Answer>(this.$ref.root.child('answer/' + this.answer_id), Answer);
    }

    /**
     * Set user
     *
     * @return Response
     * @param user
     */
    public setUser(user?: User): Observable<this> {
        this.user_id = user.getKey();
        return Observable.of(this.$ref.child('user_id').set(this.user_id)).map(() => this);
    }

    /**
     * Get user
     *
     * @return User
     */
    public getUser(): Observable<User> {
        return FirebaseObjectFactory<User>(this.$ref.root.child('user/' + this.user_id), File);
    }

    /**
     * Set file
     *
     * @return Response
     * @param file
     */
    public setFile(file?: File): Observable<this> {
        this.file_id = file.getKey();
        return Observable.of(this.$ref.child('file_id').set(this.file_id)).map(() => this);
    }

    /**
     * Get file
     *
     * @return File
     */
    public getFile(): Observable<File> {
        return FirebaseObjectFactory<File>(this.$ref.root.child('file/' + this.file_id), File);
    }

    /**
     * Set correct
     *
     * @return Response
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
     * @return Response
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
    public getCard(): Observable<Card> {
        return FirebaseObjectFactory<Card>(this.$ref.root.child('card/' + this.card_id), Card);
    }
}
