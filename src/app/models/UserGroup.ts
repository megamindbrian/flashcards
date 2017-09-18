import { DbIdObject, DbObject } from './DbIdObject';
import { GroupCollectionForeignKey, UserCollectionForeignKey } from './Factories';
import { Group } from './Group';
import { Observable } from 'rxjs/Observable';
import { User } from './User';

export class UserGroup extends DbObject<UserGroup> implements GroupCollectionForeignKey<UserGroup>,
                                                              UserCollectionForeignKey<UserGroup> {
    public setGroup = (item?: Group) => this.setFk<Group>('group_id', item);
    public getGroupId = () => this.getFkId<Group>('group_id');
    public getGroup = (): Observable<Group> => this.getFk<Group>('group_id', Group);

    public setUser = (user?: User) => this.setFk<User>('user_id', user);
    public getUserId = () => this.getFkId<User>('user_id');
    public getUser = (): Observable<User> => this.getFk<User>('user_id', User);

}
