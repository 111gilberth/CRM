import { FormGroup } from "@angular/forms";
import { AddressForm } from "./address.form";
import { CategoryForm } from "./category.form";
import { TypeEnum } from "../account/Account";

export class RestaurantForm {
  name: string;
  phoneNumber: string;
  rfc: string;
  type: TypeEnum;
  addresses: Array<AddressForm>;
  categories: Array<CategoryForm>;

  constructor(form: FormGroup, addresses: Array<AddressForm>) {
    this.name = form.value.name;
    this.phoneNumber = form.value.phoneNumber;
    this.rfc = form.value.rfc;
    this.type = form.value.type;
    this.addresses = addresses;
  }
}
