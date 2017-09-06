import { Card } from './Card';
import { Answer } from './Answer';
import { User } from './User';
import { File } from './File';
import { DbDeletableObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import {
    AnswerCollectionForeignKey, CardCollectionForeignKey, FileCollectionForeignKey,
    UserCollectionForeignKey
} from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="response")
 * @ORM\HasLifecycleCallbacks()
 */
export class Response extends DbDeletableObject<Response> implements UserCollectionForeignKey<Response>,
                                                                     FileCollectionForeignKey<Response>,
                                                                     CardCollectionForeignKey<Response>,
                                                                     AnswerCollectionForeignKey<Response> {

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * @ORM\ManyToOne(targetEntity="Card", inversedBy="responses")
     * @ORM\JoinColumn(name="card_id", referencedColumnName="$key", nullable=true)
     */

    /**
     * @ORM\ManyToOne(targetEntity="Answer", inversedBy="responses")
     * @ORM\JoinColumn(name="answer_id", referencedColumnName="$key", nullable=true)
     */

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="responses")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */

    /**
     * @ORM\OneToOne(targetEntity="File", inversedBy="response")
     * @ORM\JoinColumn(name="file_id", referencedColumnName="$key", nullable=true)
     */

    /**
     * @ORM\Column(type="text", name="value", nullable=true)
     */
    protected value: string;

    /**
     * @ORM\Column(type="boolean", name="correct")
     */
    protected correct: boolean;

    public setUser = (user?: User) => this.setFk<User>('user_id', user);
    public getUserId = () => this.getFkId<User>('user_id');
    public getUser = (): Observable<User> => this.getFk<User>('user_id', User);

    public setFile = (file: File) => Observable.of(this);
    public getFileId = () => 0;
    public getFile = (): Observable<File> => Observable.of(void 0 as File);

    public setCard = (card: Card) => Observable.of(this);
    public getCardId = () => 0;
    public getCard = (): Observable<Card> => Observable.of(void 0 as Card);

    public setAnswer = (answer: Answer) => Observable.of(this);
    public getAnswerId = () => 0;
    public getAnswer = (): Observable<Answer> => Observable.of(void 0 as Answer);

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

}
