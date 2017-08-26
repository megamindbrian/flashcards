// expose database so objects maintain their own reference code
import { DatabaseReference } from 'angularfire2/database/interfaces';

export abstract class DbIdObject<T> {

    // TODO: move ORM mapping login to unwrapper function?
    constructor(public $ref: DatabaseReference,
                public $exists: boolean,
                public $key: string) {
    }

    /**
     * Get $key
     *
     * @return string
     */
    public getKey(): string {
        return this.$key;
    }
}
