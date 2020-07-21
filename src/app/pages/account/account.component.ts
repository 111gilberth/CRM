import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { StorageService } from "src/app/services/storage.service";
import { RestaurantForm } from "src/app/constants/form/restaurant.form";
import { AddressForm } from "src/app/constants/form/address.form";
import { BsModalService } from "ngx-bootstrap/modal";
import { TypeRestaurantEnum } from "../../constants/account/Account";
import { SuccessModalComponent } from "src/commons/success-modal/success-modal.component";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
})
export class AccountComponent implements OnInit {
  restaurantID: string;
  accountForm: FormGroup;
  readonly typesRestaurant = TypeRestaurantEnum.ALL;

  constructor(
    private useService: UserService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private modalService: BsModalService
  ) {
    this.restaurantID = storageService.getCurrentRestaurantID();
    this.accountForm = fb.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      rfc: ["", Validators.required],
      city: ["", Validators.required],
      zipCode: [, Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      neighborhood: ["", Validators.required],
      id: [""],
    });
  }

  ngOnInit() {
    this.getRestaurantDetail();
  }

  createAddressForm() {
    return this.fb.group({});
  }

  initForm(account) {
    this.accountForm.get("name").setValue(account.name);
    this.accountForm.get("name").setValue(account.name);
    this.accountForm.get("phoneNumber").setValue(account.phoneNumber);
    this.accountForm.get("rfc").setValue(account.rfc);
    this.accountForm.get("type").setValue(account.type);
    for (let address of account.adresses) {
      this.accountForm.get("id").setValue(address.id);
      this.accountForm.get("zipCode").setValue(address.zipCode);
      this.accountForm.get("city").setValue(address.city);
      this.accountForm.get("state").setValue(address.state);
      this.accountForm.get("country").setValue(address.country);
      this.accountForm.get("neighborhood").setValue(address.neighborhood);
    }
  }

  onSubmit() {
    console.log(this.accountForm.value);
  }

  getRestaurantDetail() {
    this.useService
      .getRestaurantdetail(this.restaurantID)
      .subscribe((response) => {
        this.initForm(response);
      });
  }

  updaterestaurant() {
    const adressForm = new AddressForm(
      this.accountForm.value.id,
      this.accountForm.value.city,
      this.accountForm.value.country,
      0,
      0,
      "",
      "",
      this.accountForm.value.neighborhood,
      this.accountForm.value.state,
      "TBD",
      this.accountForm.value.zipCode
    );
    const form = new RestaurantForm(this.accountForm, [adressForm]);
    this.useService
      .updateRestaurantdetail(this.restaurantID, form)
      .subscribe((response) => {
        this.modalService.show(SuccessModalComponent);
        this.getRestaurantDetail();
      });
  }
}
