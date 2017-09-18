import { DbIdObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { Bundle } from './Bundle';
import { Pack } from './Pack';
import { Answer } from './Answer';
import { Visit } from './Visit';
import { Group } from './Group';
import { Response } from './Response';
import { UserPack } from './UserPack';
import { User } from './User';
import { Invite } from './Invite';
import { Payment } from './Payment';
import { BaseUser } from './BaseUser';
import { Card } from './Card';
import { File } from './File';
import { Session } from './Session';
import { UserGroup } from './UserGroup';

export abstract class DbCollectionForiegnKey<T> extends DbIdObject {
}

export class DbCollection<T> extends DbIdObject {

}

export interface BundleCollection extends DbCollection<Bundle> {
    addBundle(bundle: Bundle): Observable<this>;

    removeBundle(bundle: Bundle): Observable<this>;

    getBundles(): Observable<Array<Bundle>>;
}

export interface BundleCollectionForiegnKey extends DbCollectionForiegnKey<Bundle> {
    setBundle(file?: Bundle): Observable<this>;

    getBundleId(): number;

    getBundle(): Observable<Bundle>;
}

export interface AnswerCollection extends DbCollection<Answer> {
    addAnswer(bundle: Answer): Observable<this>;

    removeAnswer(bundle: Answer): Observable<this>;

    getAnswers(): Observable<Array<Answer>>;
}

export interface AnswerCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Answer> {
    setAnswer(file?: Answer): Observable<this>;

    getAnswerId(): number;

    getAnswer(): Observable<Answer>;
}

export interface VisitCollection extends DbCollection<Visit> {
    addVisit(visit: Visit): Observable<this>;

    removeVisit(visit: Visit): Observable<this>;

    getVisits(): Observable<Array<Visit>>;
}

export interface GroupCollection extends DbCollection<Group> {
    addGroup(group: Group): Observable<this>;

    removeGroup(group: Group): Observable<this>;

    getGroups(): Observable<Array<Group>>;
}

export interface UserGroupCollection extends DbCollection<UserGroup> {
    addUserGroup(group: UserGroup): Observable<this>;

    removeUserGroup(group: UserGroup): Observable<this>;

    getUserGroups(): Observable<Array<UserGroup>>;
}

export interface GroupCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Group> {
    setGroup(group?: Group): Observable<this>;

    getGroupId(): number;

    getGroup(): Observable<Group>;
}

export interface FileCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<File> {
    setFile(file?: File): Observable<this>;

    getFileId(): number;

    getFile(): Observable<File>;
}

export interface CardCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Card> {
    setCard(card?: Card): Observable<this>;

    getCardId(): number;

    getCard(): Observable<Card>;
}

export interface ResponseCollection extends DbCollection<Response> {
    addResponse(response: Response): Observable<this>;

    removeResponse(response: Response): Observable<this>;

    getResponses(): Observable<Array<Response>>;
}

export interface UserPackCollection extends DbCollection<UserPack> {
    addUserPack(userPack: UserPack): Observable<this>;

    removeUserPack(userPack: UserPack): Observable<this>;

    getUserPacks(): Observable<Array<UserPack>>;
}

export interface UserCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<User> {
    setUser(user?: User): Observable<this>;

    getUserId(): number;

    getUser(): Observable<User>;
}

export interface UserCollection extends DbCollection<User> {
    addUser(userpack: User): Observable<this>;

    removeUser(userpack: User): Observable<this>;

    getUsers(): Observable<Array<User>>;
}

export interface InviteCollection extends DbCollection<Invite> {
    addInvite(invite: Invite): Observable<this>;

    removeInvite(invite: Invite): Observable<this>;

    getInvites(): Observable<Array<Invite>>;
}

export interface InviteeCollection extends DbCollection<Invite> {
    addInvitee(invitee: Invite): Observable<this>;

    removeInvitee(invitee: Invite): Observable<this>;

    getInvitees(): Observable<Array<Invite>>;
}

export interface PackCollection extends DbCollection<Pack> {
    addPack(pack: Pack): Observable<this>;

    removePack(pack: Pack): Observable<this>;

    getPacks(): Observable<Array<Pack>>;
}

export interface PackCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Pack> {
    setPack(pack?: Pack): Observable<this>;

    getPackId(): number;

    getPack(): Observable<Pack>;
}

export interface PaymentCollection extends DbCollection<Payment> {
    addPayment(payment: Payment): Observable<this>;

    removePayment(payments: Payment): Observable<this>;

    getPayments(): Observable<Array<Payment>>;
}

export interface FileCollection extends DbCollection<File> {
    addFile(file: File): Observable<this>;

    removeFile(file: File): Observable<this>;

    getFiles(): Observable<Array<File>>;
}
