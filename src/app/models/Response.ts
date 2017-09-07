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

    public setFile = (item?: File) => this.setFk<File>('file_id', item);
    public getFileId = () => this.getFkId<File>('file_id');
    public getFile = (): Observable<File> => this.getFk<File>('file_id', File);

    public setCard = (item?: Card) => this.setFk<Card>('card_id', item);
    public getCardId = () => this.getFkId<Card>('card_id');
    public getCard = (): Observable<Card> => this.getFk<Card>('card_id', Card);

    public setAnswer = (item?: Answer) => this.setFk<Answer>('answer_id', item);
    public getAnswerId = () => this.getFkId<Answer>('answer_id');
    public getAnswer = (): Observable<Answer> => this.getFk<Answer>('answer_id', Answer);

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
