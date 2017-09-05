import { DbDeletableObject } from './DbIdObject';

/**
 * @author Johannes M. Schmitt <schmittjoh@gmail.com>
 */
export class BaseGroup extends DbDeletableObject<BaseGroup> {

    /**
     * @var string
     */
    protected name: string;

    /**
     * @var array
     */
    protected roles: Array<string>;

    /**
     * {@inheritdoc}
     */
    public addRole(role: string): this {
        if (!this.hasRole(role)) {
            this.roles[ this.roles.length ] = role.toUpperCase();
        }

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * {@inheritdoc}
     */
    public hasRole(role: string): boolean {
        return this.roles.indexOf(role.toUpperCase()) > -1;
    }

    /**
     * {@inheritdoc}
     */
    public getRoles(): Array<string> {
        return this.roles;
    }

    /**
     * {@inheritdoc}
     */
    public removeRole(role: string): this {
        const key = this.roles.indexOf(role.toUpperCase());
        if (key > -1) {
            this.$ref.child('roles/' + key).remove();
        }

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setName(name: string): this {
        this.name = name;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setRoles(roles: Array<string>): this {
        this.roles = roles;

        return this;
    }
}
