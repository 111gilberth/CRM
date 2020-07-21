import { FormGroup } from '@angular/forms';

export class CategoryForm{
    id: string;
    name: string;
    restaurantID: string;

    constructor(form: FormGroup){
        this.id = form.value.id;
        this.name = form.value.name;
        this.restaurantID = form.value.restaurantID;
    }
}