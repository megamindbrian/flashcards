import { DbIdObject, DbObject } from './DbIdObject';
import { Observable } from 'rxjs/Observable';
import { Bundle } from './Bundle';
import { FirebaseObjectFactory } from '../core/database';
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

function applyMixins(derivedCtor: any, baseCtors: Array<any>): void {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[ name ] = baseCtor.prototype[ name ];
        });
    });
}

export class DbCollectionForiegnKey<T> extends DbObject<T> {
    protected group_id?: number | string;
    protected file_id?: number | string;
    protected pack_id?: number | string;
}

export class DbCollection<T> extends DbIdObject {

}

export class BundleCollection extends DbCollection<Bundle> {
    addBundle = (bundle: Bundle) => this.add('bundles', bundle);
    removeBundle = (bundle: Bundle) => this.remove('bundles', bundle);
    getBundles = () => this.list<Bundle>('bundles', Bundle);
}

export class BundleCollectionForiegnKey extends DbCollectionForiegnKey<Bundle> {
    protected bundle_id: number | string;

    getBundleId(): number {
        return typeof this.bundle_id === 'string' ? parseInt(this.bundle_id as string) : this.bundle_id as number;
    }
}

export class AnswerCollection extends DbCollection<Answer> {
    addAnswer = (bundle: Answer) => this.add('answers', bundle);
    removeAnswer = (bundle: Answer) => this.remove('answers', bundle);
    getAnswers = () => this.list<Answer>('answers', Answer);
}

export class VisitCollection extends DbCollection<Visit> {
    public addVisit(visit: Visit): Observable<this> {
        return this.add('visits', visit);
    }

    public removeVisit(visit: Visit): Observable<this> {
        return this.remove('visits', visit);
    }

    public getVisits(): Observable<Array<Visit>> {
        return this.list('visits', Visit);
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
        return this.list('groups', Group);
    }
}

export class GroupCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Group> {
    setGroup = (group?: Group) => this.setFk<GroupCollectionForeignKey<T>>('group_id', group);
    getGroupId = () => this.getFkId<GroupCollectionForeignKey<T>>('group_id');
    getGroup = () => this.getFk<GroupCollectionForeignKey<T>>('group_id', Group);
}

export class FileCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<File> {
    setFile = (file?: File) => this.setFk<FileCollectionForeignKey<T>>('file_id', file);
    getFileId = () => this.getFkId<FileCollectionForeignKey<T>>('file_id');
    getFile = () => this.getFk<FileCollectionForeignKey<T>>('file_id', File);
}

export class ResponseCollection extends DbCollection<Response> {
    public addResponse(response: Response): Observable<this> {
        return this.add('responses', response);
    }

    public removeResponse(response: Response): Observable<this> {
        return this.remove('responses', response);
    }

    public getResponses(): Observable<Array<Response>> {
        return this.list('responses', Response);
    }
}

export class UserPackCollection extends DbCollection<UserPack> {
    public addUserPack(userpack: UserPack): Observable<this> {
        return this.add('userPacks', userpack);
    }

    public removeUserPack(userpack: UserPack): Observable<this> {
        return this.remove('userPacks', userpack);
    }

    public getUserPacks(): Observable<Array<UserPack>> {
        return this.list<UserPack>('userPacks', UserPack);
    }
}

export class UserCollection extends DbCollection<User> {
    public addUser(userpack: User): Observable<this> {
        return this.add('users', userpack);
    }

    public removeUser(userpack: User): Observable<this> {
        return this.remove('users', userpack);
    }

    public getUsers(): Observable<Array<User>> {
        return this.list('users', User);
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
        return this.list('invites', Invite);
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
        return this.list('invitees', Invite);
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
        return this.list('packs', Pack);
    }
}

export class PackCollectionForeignKey<T extends DbIdObject> extends DbCollectionForiegnKey<Pack> {
    setPack = (pack?: Pack) => this.setFk<PackCollectionForeignKey<T>>('pack_id', pack);
    getPackId = () => this.getFkId<PackCollectionForeignKey<T>>('pack_id');
    getPack = () => this.getFk<PackCollectionForeignKey<T>>('pack_id', Pack);
}

export class PaymentCollection extends DbCollection<Payment> {
    public addPayment(payment: Payment): Observable<this> {
        return this.add('payments', payment);
    }

    public removePayment(payments: Payment): Observable<this> {
        return this.remove('payments', payments);
    }

    public getPayments(): Observable<Array<Payment>> {
        return this.list('payments', Payment);
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
        return this.list('files', File);
    }
}

applyMixins(Answer, [
    ResponseCollection
]);

applyMixins(Bundle, [
    PackCollection,
    PaymentCollection
]);

applyMixins(BaseUser, [
    GroupCollection
]);

applyMixins(Card, [
    AnswerCollection,
    ResponseCollection
]);

applyMixins(Group, [
    BundleCollection,
    UserCollection,
    PackCollection,
    InviteCollection,
    GroupCollection
]);

applyMixins(Pack, [
    BundleCollection,
    UserPackCollection,
    UserCollection
]);

applyMixins(Payment, [
    BundleCollection
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
