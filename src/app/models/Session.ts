import { Visit } from './Visit';
import { DbDeletableObject } from './DbIdObject';
import { VisitCollection } from './Factories';
import { Observable } from 'rxjs/Observable';

/**
 * @ORM\Entity
 * @ORM\Table(name="session")
 */
export class Session extends DbDeletableObject<Session> implements VisitCollection {
    /**
     * @ORM\Column(type="string", length=128, name="session_id")
     * @ORM\Id
     */
    protected session_id: string;

    /**
     * @ORM\Column(type="text", name="session_value")
     */
    protected session_value: string;

    /**
     * @ORM\Column(type="integer", name="session_time")
     */
    protected session_time: Date;

    /**
     * @ORM\Column(type="integer", name="session_lifetime")
     */
    protected session_lifetime: number;

    /**
     * @ORM\OneToMany(targetEntity="Visit", mappedBy="session")
     * @ORM\OrderBy({"created" = "DESC"})
     */

    addVisit = (bundle: Visit) => Observable.of(this);
    removeVisit = (bundle: Visit) => Observable.of(this);
    getVisits = () => Observable.of([] as Array<Visit>);

    public getSessionId(): string {
        return this.session_id;
    }

    /**
     * Set id
     *
     * @return Session
     * @param id
     */
    public setId(id: string): this {
        this.session_id = id;

        return this;
    }

    /**
     * Set value
     *
     * @return Session
     * @param value
     */
    public setValue(value: string): this {
        this.session_value = value;

        return this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public getValue(): string {
        return this.session_value;
    }

    /**
     * Set time
     *
     * @return Session
     * @param time
     */
    public setTime(time: Date): this {
        this.session_time = time;

        return this;
    }

    /**
     * Get time
     *
     * @return integer
     */
    public getTime(): Date {
        return this.session_time;
    }

    /**
     * Set lifetime
     *
     * @return Session
     * @param lifetime
     */
    public setLifetime(lifetime: number): this {
        this.session_lifetime = lifetime;

        return this;
    }

    /**
     * Get lifetime
     *
     * @return integer
     */
    public getLifetime(): number {
        return this.session_lifetime;
    }
}
