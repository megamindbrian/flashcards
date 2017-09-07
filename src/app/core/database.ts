import {
    AngularFireDatabase,
    FirebaseListObservable, FirebaseObjectObservable,
    onChildAdded, onChildChanged, onChildRemoved
} from 'angularfire2/database';
import { DatabaseSnapshot } from 'angularfire2/database/interfaces';
import { Observer } from 'rxjs/Observer';
import { isNil } from 'angularfire2/database/utils';
import * as firebase from 'firebase/app';

function firebaseUnwrap<T extends object>(snapshot: DatabaseSnapshot,
                                          type: any): T {
    let unwrapped = !isNil(snapshot.val()) ? snapshot.val() : {$value: void 0};
    if ((/string|number|boolean/).test(typeof unwrapped)) {
        unwrapped = {
            $value: unwrapped
        };
    }
    console.log('hit');
    const prototype = typeof type.constructor !== 'undefined' ? type : Object.getPrototypeOf(type).constructor;
    try {
        const result = new prototype(
            snapshot.ref,
            snapshot.exists(),
            snapshot.ref.key) as T;
        Object.assign(result, unwrapped);
        return result;
    } catch (e) {
        throw e;
    }
}

// export function user(database: AngularFireDatabase): FirebaseObjectObservable<User> {
//    getRef(database.app, 'mail')
// }

export function FirebaseObjectFactory<T extends object>(ref: firebase.database.Reference,
                                                        prototype: any): FirebaseObjectObservable<T> {
    // TODO: should be in the subscription zone instead
    return new FirebaseObjectObservable((obs: Observer<any>) => {
        const fn = ref.on('value', (snapshot: DatabaseSnapshot) => {
            obs.next(firebaseUnwrap(snapshot, prototype));
        }, (err: Error) => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });

        return () => ref.off('value', fn);
    }, ref);
}

export function FirebaseListFactory<T extends object>(ref: firebase.database.Reference,
                                                      prototype: any): FirebaseListObservable<Array<T>> {
    const toKey = ((value: any) => value.$key);

    return new FirebaseListObservable<Array<T>>(ref, (obs: Observer<any>) => {

        // Keep track of callback handles for calling ref.off(event, handle)
        const handles: Array<{
            event: string,
            handle: (a: DatabaseSnapshot, b?: string | null | undefined) => any
        }> = [];
        let hasLoaded = false;
        let lastLoadedKey: string = void 0;
        let array: Array<DatabaseSnapshot> = [];

        // The list children are always added to, removed from and changed within
        // the array using the child_added/removed/changed events. The value event
        // is only used to determine when the initial load is complete.

        ref.once('value', (snap: any) => {
            if (snap.exists()) {
                snap.forEach((child: any) => {
                    lastLoadedKey = child.key;
                });
                if (array.find((child: any) => toKey(child) === lastLoadedKey)) {
                    hasLoaded = true;
                    obs.next(array);
                }
            } else {
                hasLoaded = true;
                obs.next(array);
            }
        }, (err: Error) => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });

        const addFn = ref.on('child_added', (child: any, prevKey: string) => {
            array = onChildAdded(array, firebaseUnwrap(child, prototype), toKey, prevKey);
            if (hasLoaded) {
                obs.next(array);
            } else if (child.key === lastLoadedKey) {
                hasLoaded = true;
                obs.next(array);
            }
        }, (err: Error) => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        handles.push({event: 'child_added', handle: addFn});

        const remFn = ref.on('child_removed', (child: any) => {
            array = onChildRemoved(array, firebaseUnwrap(child, prototype), toKey);
            if (hasLoaded) {
                obs.next(array);
            }
        }, (err: Error) => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        handles.push({event: 'child_removed', handle: remFn});

        const chgFn = ref.on('child_changed', (child: any, prevKey: string) => {
            array = onChildChanged(
                array,
                firebaseUnwrap(child, prototype),
                toKey,
                prevKey);
            if (hasLoaded) {
                obs.next(array);
            }
        }, (err: Error) => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        handles.push({event: 'child_changed', handle: chgFn});

        return () => {
            // Loop through callback handles and dispose of each event with handle
            // The Firebase SDK requires the reference, event name, and callback to
            // properly unsubscribe, otherwise it can affect other subscriptions.
            handles.forEach(item => {
                ref.off(item.event, item.handle);
            });
        };

    }) as FirebaseListObservable<Array<T>>;

// TODO: should be in the subscription zone instead
// observeOn.call(listObs, new ZoneScheduler(Zone.current));
}
