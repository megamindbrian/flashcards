import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FirebaseListFactory, FirebaseObjectFactory } from '../core/database';

import { Answer } from './Answer';
import { User } from './User';
import { Token } from './Token';
import { Session } from './Session';
import { UserPack } from './UserPack';
import { Visit } from './Visit';
import { Bundle } from './Bundle';
import { Card } from './Card';
import { Group } from './Group';
import { Invite } from './Invite';
import { Mail } from './Mail';
import { Pack } from './Pack';
import { Payment } from './Payment';
import { Response } from './Response';

export function AnswerListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Answer>> {
    return FirebaseListFactory<Answer>(ref, Answer.prototype);
}

export function AnswerObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Answer> {
    return FirebaseObjectFactory<Answer>(ref, Answer.prototype);
}

export function BundleListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Bundle>> {
    return FirebaseListFactory<Bundle>(ref, Bundle.prototype);
}

export function BundleObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Bundle> {
    return FirebaseObjectFactory<Bundle>(ref, Bundle.prototype);
}

export function CardListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Card>> {
    return FirebaseListFactory<Card>(ref, Card.prototype);
}

export function CardObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Card> {
    return FirebaseObjectFactory<Card>(ref, Card.prototype);
}

export function FileListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<File>> {
    return FirebaseListFactory<File>(ref, File.prototype);
}

export function GroupObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Group> {
    return FirebaseObjectFactory<Group>(ref, Group.prototype);
}

export function GroupListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Group>> {
    return FirebaseListFactory<Group>(ref, Group.prototype);
}

export function InviteObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Invite> {
    return FirebaseObjectFactory<Invite>(ref, Invite.prototype);
}

export function InviteListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Invite>> {
    return FirebaseListFactory<Invite>(ref, Invite.prototype);
}

export function MailObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Mail> {
    return FirebaseObjectFactory<Mail>(ref, Mail.prototype);
}

export function MailListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Mail>> {
    return FirebaseListFactory<Mail>(ref, Mail.prototype);
}

export function PackObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Pack> {
    return FirebaseObjectFactory<Pack>(ref, Pack.prototype);
}

export function PackListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Pack>> {
    return FirebaseListFactory<Pack>(ref, Pack.prototype);
}

export function PaymentObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Payment> {
    return FirebaseObjectFactory<Payment>(ref, Payment.prototype);
}

export function PaymentListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Payment>> {
    return FirebaseListFactory<Payment>(ref, Payment.prototype);
}

export function ResponseObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Response> {
    return FirebaseObjectFactory<Response>(ref, Response.prototype);
}

export function ResponseListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Response>> {
    return FirebaseListFactory<Response>(ref, Response.prototype);
}

export function SessionObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Session> {
    return FirebaseObjectFactory<Session>(ref, Session.prototype);
}

export function SessionListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Session>> {
    return FirebaseListFactory<Session>(ref, Session.prototype);
}

export function TokenObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Token> {
    return FirebaseObjectFactory<Token>(ref, Token.prototype);
}

export function TokenListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Token>> {
    return FirebaseListFactory<Token>(ref, Token.prototype);
}

export function UserObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<User> {
    return FirebaseObjectFactory<User>(ref, User.prototype);
}

export function UserListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<User>> {
    return FirebaseListFactory<User>(ref, User.prototype);
}

export function UserPackObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<UserPack> {
    return FirebaseObjectFactory<UserPack>(ref, UserPack.prototype);
}

export function UserPackListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<UserPack>> {
    return FirebaseListFactory<UserPack>(ref, UserPack.prototype);
}

export function VisitObjectFactory(ref: firebase.database.Reference): FirebaseObjectObservable<Visit> {
    return FirebaseObjectFactory<Visit>(ref, Visit.prototype);
}

export function VisitListFactory(ref: firebase.database.Reference): FirebaseListObservable<Array<Visit>> {
    return FirebaseListFactory<Visit>(ref, Visit.prototype);
}
