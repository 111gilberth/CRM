import { FormGroup } from '@angular/forms';

export class UserForm {
    username: string;
    password: string;

    constructor(form: FormGroup){
        this.username = form.value.username;
        this.password = form.value.password;
    }
}