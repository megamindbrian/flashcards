import { Group } from './Group';
import { DbPropertiesObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { UserGroupCollection } from './Factories';
import { UserGroup } from './UserGroup';

export class BaseUser extends DbPropertiesObject<BaseUser> implements UserGroupCollection {
    static ROLE_DEFAULT = 'ROLE_USER';
    static ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
    /**
     * @var mixed
     */

    /**
     * @var string
     */
    protected username: string;

    /**
     * @var string
     */
    protected usernameCanonical: string;

    /**
     * @var string
     */
    protected email: string;

    /**
     * @var string
     */
    protected emailCanonical: string;

    /**
     * @var bool
     */
    protected enabled = false;

    /**
     * The salt to use for hashing.
     *
     * @var string
     */
    protected salt: string;

    /**
     * Encrypted password. Must be persisted.
     *
     * @var string
     */
    protected password: string;

    /**
     * Plain password. Used for model validation. Must not be persisted.
     *
     * @var string
     */
    protected plainPassword: string;

    /**
     * @var Date
     */
    protected lastLogin: Date;

    /**
     * Random string sent to the user email address in order to verify it.
     *
     * @var string
     */
    protected confirmationToken: string;

    /**
     * @var Date
     */
    protected passwordRequestedAt: Date;

    /**
     * @var Array<Group>
     */

    /**
     * @var array
     */
    protected roles: Array<string>;

    public addUserGroup = (item: UserGroup) => this.add('userGroups', item);
    public removeUserGroup = (item: UserGroup) => this.remove('userGroups', item);
    public getUserGroups = (): Observable<Array<UserGroup>> => this.list('user_group', 'user_id', UserGroup);

    /**
     * {@inheritdoc}
     */
    public addRole(role: string): this {
        role = role.toUpperCase();
        if (role === BaseUser.ROLE_DEFAULT) {
            return this;
        }

        if (this.roles.indexOf(role) === -1) {
            this.roles[ this.roles.length ] = role;
        }

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public eraseCredentials(): this {
        this.plainPassword = void 0;
        return this;
    }

    /**
     * {@inheritdoc}
     */
    public getUsername(): string {
        return this.username;
    }

    /**
     * {@inheritdoc}
     */
    public getUsernameCanonical(): string {
        return this.usernameCanonical;
    }

    /**
     * {@inheritdoc}
     */
    public getSalt(): string {
        return this.salt;
    }

    /**
     * {@inheritdoc}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * {@inheritdoc}
     */
    public getEmailCanonical(): string {
        return this.emailCanonical;
    }

    /**
     * {@inheritdoc}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * {@inheritdoc}
     */
    public getPlainPassword(): string {
        return this.plainPassword;
    }

    /**
     * Gets the lastName login time.
     *
     * @return Date
     */
    public getLastLogin(): Date {
        return this.lastLogin;
    }

    /**
     * {@inheritdoc}
     */
    public getConfirmationToken(): string {
        return this.confirmationToken;
    }

    /**
     * {@inheritdoc}
     */
    public getRoles(): Observable<Array<string>> {
        return this.getGroups()
            .map(groups => this.roles.concat(...groups.map(g => g.getRoles()))
                .filter((elem: string, pos: number, arr: Array<string>) => {
                    return arr.indexOf(elem) === pos;
                }));
    }

    public getGroups(): Observable<Array<Group>> {
        return this.getUserGroups()
            .flatMap(ugs => Observable.zip(...ugs
                .map(ug => ug.getGroup())));
    }

    /**
     * {@inheritdoc}
     */
    public hasRole(role: string): Observable<boolean> {
        return this.getRoles()
            .map(roles => roles.indexOf(role.toUpperCase()) > -1);
    }

    /**
     * {@inheritdoc}
     */
    public isAccountNonExpired(): boolean {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public isAccountNonLocked(): boolean {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public isCredentialsNonExpired(): boolean {
        return true;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * {@inheritdoc}
     */
    public isSuperAdmin(): Observable<boolean> {
        return this.hasRole(BaseUser.ROLE_SUPER_ADMIN);
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
    public setUsername(username: string): this {
        this.username = username;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setUsernameCanonical(usernameCanonical: string): this {
        this.usernameCanonical = usernameCanonical;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setSalt(salt: string): this {
        this.salt = salt;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setEmail(email: string): this {
        this.email = email;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setEmailCanonical(emailCanonical: string): this {
        this.emailCanonical = emailCanonical;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setEnabled(b: boolean): this {
        this.enabled = b;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setPassword(password: string): this {
        this.password = password;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setSuperAdmin(b: boolean): this {
        if (b === true) {
            this.addRole(BaseUser.ROLE_SUPER_ADMIN);
        } else {
            this.removeRole(BaseUser.ROLE_SUPER_ADMIN);
        }

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setPlainPassword(password: string): this {
        this.plainPassword = password;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setLastLogin(time?: Date): this {
        this.lastLogin = time;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setConfirmationToken(confirmationToken: string): this {
        this.confirmationToken = confirmationToken;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public setPasswordRequestedAt(date?: Date): this {
        this.passwordRequestedAt = date;

        return this;
    }

    /**
     * Gets the timestamp that the user requested a password reset.
     *
     * @return null|Date
     */
    public getPasswordRequestedAt(): Date {
        return this.passwordRequestedAt;
    }

    /**
     * {@inheritdoc}
     */
    public isPasswordRequestNonExpired(ttl: number): boolean {
        return this.getPasswordRequestedAt() instanceof Date &&
            this.getPasswordRequestedAt().getTime() + ttl > (new Date()).getTime();
    }

    /**
     * {@inheritdoc}
     */
    public setRoles(roles: Array<string>): this {
        this.$ref.child('roles').set(roles);

        return this;
    }

    /**
     * {@inheritdoc}
     */
    public getGroupNames(): Observable<Array<string>> {
        return this.getGroups().map(g => g.map(group => group.getName()));
    }

    /**
     * {@inheritdoc}
     */
    public hasGroup(name: string): Observable<boolean> {
        return this.getGroupNames().map(groups => groups.indexOf(name) > -1);
    }

    /**
     * @return string
     */
    public toString(): string {
        return this.getUsername();
    }
}
