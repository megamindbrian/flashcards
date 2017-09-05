import { DbDeletableObject } from './DbIdObject';
/**
 * @ORM\Entity
 * @ORM\Table(name="rememberme_token")
 */
export class Token extends DbDeletableObject<Token> {

    /**
     * @ORM\Column(type="string", length=88, name="value")
     */
    protected value: string;

    /**
     * @ORM\Column(type="datetime", name="lastUsed")
     */
    protected lastUsed: Date;

    /**
     * @ORM\Column(type="string", length=100, name="type")
     */
    protected type: string;

    /**
     * @ORM\Column(type="string", length=200, name="username")
     */
    protected username: string;

    /**
     * Set value
     *
     *
     * @return Token
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
     * Set lastUsed
     *
     *
     * @return Token
     * @param lastUsed
     */
    public setLastUsed(lastUsed: Date): this {
        this.lastUsed = lastUsed;

        return this;
    }

    /**
     * Get lastUsed
     *
     * @return Date
     */
    public getLastUsed(): Date {
        return this.lastUsed;
    }

    /**
     * Set class
     *
     *
     * @return Token
     */
    public setType(type: string): this {
        this.type = type;

        return this;
    }

    /**
     * Get class
     *
     * @return string
     */
    public getType(): string {
        return this.type;
    }

    /**
     * Set username
     *
     * @param username
     *
     * @return Token
     */
    public setUsername(username: string): this {
        this.username = username;

        return this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public getUsername(): string {
        return this.username;
    }
}
