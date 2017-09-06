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

export abstract class DbCollectionForiegnKey<T> extends DbIdObject {
}

export class DbCollection<T> extends DbIdObject {

}

export class BundleCollection extends DbCollection<Bundle> {
    addBundle = (bundle: Bundle) => this.add('bundles', bundle);
    removeBundle = (bundle: Bundle) => this.remove('bundles', bundle);
    getBundles = (): Observable<Array<Bundle>> => this.list<Bundle>('bundles', 'bundle_id', Bundle);
}

export class BundleCollectionForiegnKey extends DbCollectionForiegnKey<Bundle> {
    getBundleId(): number {
        return typeof this.bundle_id === 'string' ? parseInt(this.bundle_id as string) : this.bundle_id as number;
    }
}

export class AnswerCollection extends DbCollection<Answer> {
    addAnswer = (bundle: Answer) => this.add('answers', bundle);
    removeAnswer = (bundle: Answer) => this.remove('answers', bundle);
    getAnswers = (): Observable<Array<Answer>> => this.list<Answer>('answers', 'answer_id', Answer);
}

export class AnswerCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Answer> {
    setAnswer = (file?: Answer) => this.setFk<Answer>('answer_id', file);
    getAnswerId = () => this.getFkId<Answer>('answer_id');
    getAnswer = (): Observable<Answer> => this.getFk<Answer>('answer_id', Answer);
}

export class VisitCollection extends DbCollection<Visit> {
    public addVisit(visit: Visit): Observable<this> {
        return this.add('visits', visit);
    }

    public removeVisit(visit: Visit): Observable<this> {
        return this.remove('visits', visit);
    }

    public getVisits(): Observable<Array<Visit>> {
        return this.list('visits', 'visit_id', Visit);
    }
}

export class GroupCollection extends DbCollection<Group> {
    public addGroup(group: Group): Observable<this> {
        return this.add('groups', group);
    }

    public removeGroup(group: Group): Observable<this> {
        return this.remove('groups', group);
    }

    public getGroups(): Observable<Array<Group>> {
        return this.list<Group>('groups', 'group_id', Group);
    }
}

export class GroupCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Group> {
    setGroup = (group?: Group) => this.setFk<Group>('group_id', group);
    getGroupId = () => this.getFkId<Group>('group_id');
    getGroup = (): Observable<Group> => this.getFk<Group>('group_id', Group);
}

export interface FileCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<File> {
    setFile(file?: File): Observable<this>;

    getFileId(): number;

    getFile(): Observable<File>;
}

export class CardCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Card> {
    setCard = (card?: Card) => this.setFk<Card>('card_id', card);
    getCardId = () => this.getFkId<Card>('card_id');
    getCard = (): Observable<Card> => this.getFk<Card>('card_id', Card);
}

export class ResponseCollection extends DbCollection<Response> {
    public addResponse(response: Response): Observable<this> {
        return this.add('responses', response);
    }

    public removeResponse(response: Response): Observable<this> {
        return this.remove('responses', response);
    }

    public getResponses(): Observable<Array<Response>> {
        return this.list('responses', 'response_id', Response);
    }
}

export class UserPackCollection extends DbCollection<UserPack> {
    public addUserPack(userPack: UserPack): Observable<this> {
        return this.add('userPacks', userPack);
    }

    public removeUserPack(userPack: UserPack): Observable<this> {
        return this.remove('userPacks', userPack);
    }

    public getUserPacks(): Observable<Array<UserPack>> {
        console.log('hit241234');
        return this.list('userPacks', 'user_id', UserPack);
    }
}

export interface UserCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<User> {
    setUser(user?: User): Observable<this>;

    getUserId(): number;

    getUser(): Observable<User>;
}

export class UserCollection extends DbCollection<User> {
    public addUser(userpack: User): Observable<this> {
        return this.add('users', userpack);
    }

    public removeUser(userpack: User): Observable<this> {
        return this.remove('users', userpack);
    }

    public getUsers(): Observable<Array<User>> {
        return this.list('users', 'user_id', User);
    }
}

export class InviteCollection extends DbCollection<Invite> {
    public addInvite(invite: Invite): Observable<this> {
        return this.add('invites', invite);
    }

    public removeInvite(invite: Invite): Observable<this> {
        return this.remove('invites', invite);
    }

    public getInvites(): Observable<Array<Invite>> {
        return this.list('invites', 'invite_id', Invite);
    }
}

export class InviteeCollection extends DbCollection<Invite> {
    public addInvitee(invitee: Invite): Observable<this> {
        return this.add('invitees', invitee);
    }

    public removeInvitee(invitee: Invite): Observable<this> {
        return this.remove('invitees', invitee);
    }

    public getInvitees(): Observable<Array<Invite>> {
        return this.list('invitees', 'invitee_id', Invite);
    }
}

export class PackCollection extends DbCollection<Pack> {
    public addPack(pack: Pack): Observable<this> {
        return this.add('packs', pack);
    }

    public removePack(pack: Pack): Observable<this> {
        return this.remove('packs', pack);
    }

    public getPacks(): Observable<Array<Pack>> {
        return this.list('packs', 'pack_id', Pack);
    }
}

export class PackCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Pack> {
    setPack = (pack?: Pack) => this.setFk<Pack>('pack_id', pack);
    getPackId = () => this.getFkId<Pack>('pack_id');
    getPack = (): Observable<Pack> => this.getFk<Pack>('pack_id', Pack);
}

export class PaymentCollection extends DbCollection<Payment> {
    public addPayment(payment: Payment): Observable<this> {
        return this.add('payments', payment);
    }

    public removePayment(payments: Payment): Observable<this> {
        return this.remove('payments', payments);
    }

    public getPayments(): Observable<Array<Payment>> {
        return this.list('payments', 'payment_id', Payment);
    }
}

export class FileCollection extends DbCollection<File> {
    public addFile(file: File): Observable<this> {
        return this.add('files', file);
    }

    public removeFile(file: File): Observable<this> {
        return this.remove('files', file);
    }

    public getFiles(): Observable<Array<File>> {
        return this.list('files', 'file_id', File);
    }
}

function applyMixins(derivedCtor: any, baseCtors: Array<any>): void {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            console.log(name);
            derivedCtor.prototype[ name ] = baseCtor.prototype[ name ];
        });
    });
}

applyMixins(Answer, [
    ResponseCollection,
    CardCollectionForeignKey
]);

applyMixins(BaseUser, [
    GroupCollection
]);

applyMixins(Bundle, [
    PackCollection,
    PaymentCollection,
    GroupCollectionForeignKey
]);

applyMixins(Card, [
    AnswerCollection,
    ResponseCollection,
    PackCollectionForeignKey
]);

applyMixins(File, []);

applyMixins(Group, [
    BundleCollection,
    UserCollection,
    PackCollection,
    InviteCollection,
    GroupCollection,
    GroupCollectionForeignKey
]);

applyMixins(Invite, [
    GroupCollectionForeignKey,
    PackCollectionForeignKey
]);

applyMixins(Pack, [
    GroupCollectionForeignKey,
    BundleCollection,
    UserPackCollection,
    UserCollection
]);

applyMixins(Payment, [
    BundleCollection,
    PackCollectionForeignKey
]);

applyMixins(Response, [
    CardCollectionForeignKey,
    AnswerCollectionForeignKey
]);

applyMixins(Session, [
    VisitCollection
]);

applyMixins(User, [
    VisitCollection,
    ResponseCollection,
    InviteeCollection,
    InviteCollection,
    UserPackCollection,
    PackCollection,
    FileCollection,
    PaymentCollection
]);

applyMixins(UserPack, [
    PackCollectionForeignKey
]);

applyMixins(Visit, []);
