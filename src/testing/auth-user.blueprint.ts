import { User } from '../app/models/User';

export class TestUser extends User {
}

export class UserBlueprint {
    static default(): User {
        return new TestUser(void 0, void 0, void 0);
    }
}
