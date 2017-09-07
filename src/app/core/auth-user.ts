export class AuthUser {
    public age: number;
    public salt: string;
    public purchases: any[];
    public surveys: any[];
    public completed: any;
    public resetPasswordToken: string;
    public created: Date;
    public lastActivity: Date;
    public resetPasswordExpires: Date;
    public completed_5_day_essentials: Boolean;
    public completed_11_day_essentials: Boolean;
    public oldKey: string;
    public username: string;
    public password: string;
    public database: string;
    public serverUrl: string;
    public name: {
        first: string,
        last: string
    };
    public roles: string[];

    constructor() {
    }
}