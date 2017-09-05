import { User } from './User';
import { Session } from './Session';
import { DbDeletableObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactory } from '../core/database';

/**
 * @ORM\Entity
 * @ORM\Table(name="visit",indexes={
 *     @ORM\Index(name="session_idx", columns={"session_id", "user_id"}),
 *     @ORM\Index(name="path_idx", columns={"path", "session_id", "user_id"}),
 *     @ORM\Index(name="created_idx", columns={"path", "user_id", "created"})})
 * @ORM\HasLifecycleCallbacks()
 */
export class Visit extends DbDeletableObject<Visit> {

    /**
     * @ORM\ManyToOne(targetEntity="Session", inversedBy="visits")
     * @ORM\Column(type="string", name="session_id", length=64, nullable=true)
     */
    protected session_id: string;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="visits")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="$key", nullable=true)
     */
    protected user_id: number;

    /**
     * @ORM\Column(type="string", length=256, name="path")
     */
    protected path: string;

    /**
     * @ORM\Column(type="array", name="query", nullable=true)
     */
    protected query: any;

    /**
     * @ORM\Column(type="string", length=256, name="hash")
     */
    protected hash: string;

    /**
     * @ORM\Column(type="string", length=8, name="method")
     */
    protected method: string;

    /**
     * @ORM\Column(type="bigint", length=12, name="ip")
     */
    protected ip: number;

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * Set path
     *
     * @return Visit
     * @param path
     */
    public setPath(path: string): this {
        this.path = path;

        return this;
    }

    /**
     * Get path
     *
     * @return string
     */
    public getPath(): string {
        return this.path;
    }

    /**
     * Set query
     *
     * @return Visit
     * @param query
     */
    public setQuery(query: any): this {
        this.query = query;

        return this;
    }

    /**
     * Get query
     *
     * @return any
     */
    public getQuery(): any {
        return this.query;
    }

    /**
     * Set hash
     *
     * @return Visit
     * @param hash
     */
    public setHash(hash: string): this {
        this.hash = hash;

        return this;
    }

    /**
     * Get hash
     *
     * @return string
     */
    public getHash(): string {
        return this.hash;
    }

    /**
     * Set method
     *
     * @return Visit
     * @param method
     */
    public setMethod(method: string): this {
        this.method = method;

        return this;
    }

    /**
     * Get method
     *
     * @return string
     */
    public getMethod(): string {
        return this.method;
    }

    /**
     * Set session
     *
     * @return Visit
     * @param session
     */
    public setSession(session?: Session): Observable<this> {
        this.session_id = session.getSessionId();
        return Observable.of(this.$ref.child('session_id').set(this.session_id)).map(() => this);
    }

    /**
     * Get session
     *
     * @return string
     */
    public getSession(): Observable<Session> {
        return FirebaseObjectFactory<Session>(this.$ref.root.child('session/' + this.session_id), Session);
    }

    /**
     * Set user
     *
     * @return Visit
     * @param user
     */
    public setUser(user?: User): Observable<this> {
        this.user_id = user.getId();
        return Observable.of(this.$ref.child('user_id').set(this.user_id)).map(() => this);
    }

    /**
     * Get user
     *
     * @return User
     */
    public getUser(): Observable<User> {
        return FirebaseObjectFactory<User>(this.$ref.root.child('user/' + this.user_id), User);
    }

    /**
     * Set ip
     *
     * @return Visit
     * @param ip
     */
    public setIp(ip: number): this {
        this.ip = ip;

        return this;
    }

    /**
     * Get ip
     *
     * @return integer
     */
    public getIp(): number {
        return this.ip;
    }
}
