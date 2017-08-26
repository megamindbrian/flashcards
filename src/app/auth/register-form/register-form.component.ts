import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { User } from '../../models/User';

/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    selector: 'bc-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: [ './register-form.component.scss' ]
})
export class RegisterFormComponent implements OnChanges {
    @Input() public user: User;
    @Input() public hideEmail = false;
    @Input() public hidePassword = false;

    constructor(public ref: ChangeDetectorRef) {
    }

    ngOnChanges() {
        setTimeout(() => {
            this.ref.markForCheck();
        }, 100);
    }
}

