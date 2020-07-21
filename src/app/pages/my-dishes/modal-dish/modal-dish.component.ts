import { Component, OnInit, AfterViewInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  FormGroup,
  FormBuilder,
  SelectControlValueAccessor,
} from "@angular/forms";
import { DishForm } from "src/app/constants/form/dish.form";
import { DishModel } from "src/app/constants/model/dish-model";
import { DishService } from "src/app/services/dish.service";
import { SuccessModalComponent } from "src/commons/success-modal/success-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-modal-dish",
  templateUrl: "./modal-dish.component.html",
  styleUrls: ["./modal-dish.component.css"],
})
export class ModalDishComponent implements AfterViewInit {
  dish;
  title: string;
  editForm: FormGroup;
  isEdit: boolean;
  restaurantID: string;
  buttonText: string;
  categories: any;
  imageUrl: string;
  xx: boolean;
  xxx: boolean;
  imageARurl: string;
  addimageAR: boolean;
  addimage: boolean;
  createCoverPage: File = null;
  createAR: File = null;

  constructor(
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private router: Router,
    private dishService: DishService,
    private modalService: BsModalService
  ) {
    this.editForm = fb.group({
      name: [""],
      price: [],
      description: [""],
      categoryID: [],
      categoryName: [""],
      category: [""],
      bucketARImage: [],
      imageUrlctr: [],
      image1: [],
      image2: [],
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.getDishCategories();
      if (this.isEdit) {
        this.initForm();
      }
    }, 1000);
  }

  closeModal() {
    this.modalRef.hide();
  }

  public initForm() {
    this.editForm.get("name").setValue(this.dish.name);
    this.editForm.get("price").setValue(this.dish.price);
    this.editForm.get("description").setValue(this.dish.description);
    this.editForm.get("category").setValue(this.dish.category.id);
    this.editForm.get("bucketARImage").setValue(this.dish.bucketARImageID);
    this.editForm.get("imageUrlctr").setValue(this.dish.imageURLs[0]);
    this.addimage = false;
    this.addimageAR = false;
  }

  actionModal() {
    if (this.isEdit) {
      this.updateDish();
    } else {
      this.createDish();
    }
  }

  clic() {
    this.addimage = true;
  }
  clicAR() {
    this.addimageAR = true;
  }

  createDish(): void {
    console.log("entra", this.editForm);
    const dish = new DishForm(
      this.editForm.value.name,
      this.editForm.value.price,
      this.editForm.value.description
    );
    this.dishService
      .createNewDish(
        this.restaurantID,
        this.editForm.value.category,
        this.createAR || new File[""](),
        this.createCoverPage || new File[""](),
        dish
      )
      .subscribe((response) => {
        this.modalRef.hide();
        this.openModalConfirmation();
        this.router.navigate(["dashboard/my-dishes/"]);
        console.log(response);
      });
  }

  openModalConfirmation() {
    const modal = this.modalService.show(SuccessModalComponent);
  }
  updateDish(): void {
    const dish = new DishForm(
      this.editForm.value.name,
      this.editForm.value.price,
      this.editForm.value.description
    );

    this.dishService
      .updateDish(
        this.restaurantID,
        this.editForm.value.category,
        this.dish.dishID,
        this.createAR || null,
        this.createCoverPage || null,
        dish
      )
      .subscribe((response) => {
        this.modalRef.hide();
        this.openModalConfirmation();
        this.router.navigate(["dashboard/my-dishes/"]);
        console.log(response);
      });
  }

  showPreview(event, opcion) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    if (opcion == 1) {
      console.log("event.target.value", file);
      this.createCoverPage = file;
      this.editForm.patchValue({
        imageUrlctr: event.target.value,
      });
      this.editForm.get("imageUrlctr").setValue(event.target.value);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      this.xx = true;
      this.addimage = false;
    }
    if (opcion == 2) {
      this.createAR = file;
      this.editForm.patchValue({
        bucketARImage: file,
      });
      this.editForm.get("bucketARImage").setValue(event.target.value);
      reader.onload = () => {
        this.imageARurl = reader.result as string;
      };
      this.xxx = true;
      this.addimageAR = false;
    }

    reader.readAsDataURL(file);
    console.log(file);
  }

  getDishCategories() {
    this.dishService.getCategories(this.restaurantID).subscribe((response) => {
      console.log(response[0].id);
      this.categories = response;
    });
  }
}
