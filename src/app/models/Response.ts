import { Card } from './Card';
import { Answer } from './Answer';
import { User } from './User';
import { DbIdObject } from './DbIdObject';
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
    protected card: Card;

    /**
     * @ORM\ManyToOne(targetEntity="Answer", inversedBy="responses")
     * @ORM\JoinColumn(name="answer_id", referencedColumnName="$key", nullable=true)
     */
    protected answer: Answer;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="responses")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */
    protected user: User;

    /**
     * @ORM\OneToOne(targetEntity="File", inversedBy="response")
     * @ORM\JoinColumn(name="file_id", referencedColumnName="$key", nullable=true)
     */
    protected file: File;

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
    public setAnswer(answer?: Answer): this {
        this.answer = answer;

        return this;
    }

    /**
     * Get answer
     *
     * @return Answer
     */
    public getAnswer(): Answer {
        return this.answer;
    }

    /**
     * Set user
     *
     * @return Response
     * @param user
     */
    public setUser(user?: User): this {
        this.user = user;

        return this;
    }

    /**
     * Get user
     *
     * @return User
     */
    public getUser(): User {
        return this.user;
    }

    /**
     * Set file
     *
     * @return Response
     * @param file
     */
    public setFile(file?: File): this {
        this.file = file;

        return this;
    }

    /**
     * Get file
     *
     * @return File
     */
    public getFile(): File {
        return this.file;
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
    public setCard(card?: Card): this {
        this.card = card;

        return this;
    }

    /**
     * Get card
     *
     * @return Card
     */
    public getCard(): Card {
        return this.card;
    }
}
