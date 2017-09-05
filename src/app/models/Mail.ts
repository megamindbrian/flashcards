import { DbDeletableObject } from './DbIdObject';

/**
 * @ORM\Entity
 * @ORM\Table(name="mail")
 * @ORM\HasLifecycleCallbacks()
 */
export class Mail extends DbDeletableObject<Mail> {

    /**
     * @ORM\Column(type="integer", name="status")
     */
    protected status: number;

    /**
     * @ORM\Column(type="text", name="message")
     */
    protected message: string;

    /**
     * @ORM\Column(type="string", length=256, name="environment")
     */
    protected environment: string;

    /**
     * @ORM\Column(type="datetime", name="created")
     */

    /**
     * Set status
     *
     * @return Mail
     * @param status
     */
    public setStatus(status: number): this {
        this.status = status;

        return this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public getStatus(): number {
        return this.status;
    }

    /**
     * Set message
     *
     * @return Mail
     * @param message
     */
    public setMessage(message: string): this {
        this.message = message;

        return this;
    }

    /**
     * Get message
     *
     * @return string
     */
    public getMessage(): string {
        return this.message;
    }

    public getObject(): any {
        return this.message || {};
    }

    public getRecipient(): string {
        /** @var \Swift_Message message */
        return this.getObject().to;
    }

    /**
     * Set environment
     *
     * @return Mail
     * @param environment
     */
    public setEnvironment(environment: string): this {
        this.environment = environment;

        return this;
    }

    /**
     * Get environment
     *
     * @return string
     */
    public getEnvironment(): string {
        return this.environment;
    }

}
