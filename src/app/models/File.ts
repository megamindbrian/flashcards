import { User } from './User';
import { Response } from './Response';
import { DbDeletableObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { UserCollectionForeignKey } from './Factories';

/**
 * @ORM\Entity
 * @ORM\Table(name="file")
 * @ORM\HasLifecycleCallbacks()
 */
export class File extends DbDeletableObject<File> implements UserCollectionForeignKey<File> {

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="files")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key")
     */

    /**
     * @ORM\OneToOne(targetEntity="Response", mappedBy="file", fetch="EXTRA_LAZY")
     * @ORM\OrderBy({"created" = "DESC"})
     */
    protected response: Response;

    /**
     * @ORM\Column(type="string", length=256, name="filename")
     */
    protected filename = '';

    /**
     * @ORM\Column(type="string", length=256, name="upload_id")
     */
    protected uploadId = '';

    /**
     * @ORM\Column(type="string", length=256, name="url", nullable=true)
     */
    protected url: string;

    /**
     * @ORM\Column(type="array", name="parts", nullable=true)
     */
    protected parts: Array<any>;

    /**
     * @ORM\Column(type="datetime", name="created")
     */
    public setUser = (user?: User) => this.setFk<User>('user_id', user);
    public getUserId = () => this.getFkId<User>('user_id');
    public getUser = (): Observable<User> => this.getFk<User>('user_id', User);

    /**
     * Set uploadId
     *
     * @return File
     * @param uploadId
     */
    public setUploadId(uploadId: string): this {
        this.uploadId = uploadId;

        return this;
    }

    /**
     * Get uploadId
     *
     * @return string
     */
    public getUploadId(): string {
        return this.uploadId;
    }

    /**
     * Set url
     *
     * @return File
     * @param url
     */
    public setUrl(url: string): this {
        this.url = url;

        return this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public getUrl(): string {
        return this.url;
    }

    /**
     * Set parts
     *
     * @return File
     * @param parts
     */
    public setParts(parts: Array<string>): this {
        this.parts = parts;

        return this;
    }

    /**
     * Get parts
     *
     * @return string
     */
    public getParts(): Array<string> {
        return this.parts;
    }

    /**
     * Set filename
     *
     * @return File
     * @param filename
     */
    public setFilename(filename: string): this {
        this.filename = filename;

        return this;
    }

    /**
     * Get filename
     *
     * @return string
     */
    public getFilename(): string {
        if (typeof this.filename !== 'undefined') {
            return this.url.split('/').pop();
        }
        return this.filename;
    }

    /**
     * Set response
     *
     * @return File
     * @param response
     */
    public setResponse(response?: Response): this {
        this.response = response;

        return this;
    }

    /**
     * Get response
     *
     * @return Response
     */
    public getResponse(): Response {
        return this.response;
    }
}
