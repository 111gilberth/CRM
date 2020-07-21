import { Component, OnInit, TemplateRef, Input } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { BsModalService } from "ngx-bootstrap/modal";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Dish } from "../../../constants/dishes/Dish";
import { DishService } from "../../../services/dish.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StorageService } from "src/app/services/storage.service";
import { DishForm } from "src/app/constants/form/dish.form";

@Component({
  selector: "app-edit-dishes",
  templateUrl: "./edit-dishes.component.html",
  styleUrls: ["./edit-dishes.component.scss"],
})
export class EditDishesComponent implements OnInit {
  @Input() private buttonClass: string;
  @Input() private buttonValue: string;
  @Input() private button: string;

  private modalRef: BsModalRef;
  private modalTarget: string;
  private imagePurl: string;
  private imageARurl: string;
  private location: Location;
  private route: ActivatedRoute;
  private myDish: Dish;
  private editForm: FormGroup;
  public restauratID: string;

  categories = [
    {
      id: "1",
      name: "entradas",
    },
    {
      id: "2",
      name: "cortes",
    },
    {
      id: "3",
      name: "ensaladas",
    },
    {
      id: "4",
      name: "postres",
    },
    {
      id: "5",
      name: "bebidas",
    },
  ];

  constructor(
    public fb: FormBuilder,
    private modalService: BsModalService,
    loc: Location,
    route: ActivatedRoute,
    private dishService: DishService,
    private storageService: StorageService
  ) {
    this.restauratID = this.storageService.getCurrentRestaurantID();
    this.location = loc;
    this.route = route;
  }

  public ngOnInit(): void {
    this.editar();
    this.editForm = this.fb.group({
      imagePurl: [this.myDish.bucketARImageID],
      imageARurl: [this.myDish.imageURL],
      name: [this.myDish.name],
      desc: [this.myDish.desc],
      price: [this.myDish.price],
      category: [this.myDish.category],
    });

    switch (this.buttonValue) {
      case "Eliminar": {
        this.modalTarget = "#modalEdit";
        break;
      }
      case "Editar": {
        this.modalTarget = "#modalEdit";
        break;
      }
    }
  }

  // getDish() {
  /*const id = +this.route.snapshot.paramMap.get('id');
      this.myDish = this.dishService.getDish(id);*/
  // }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }

  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  editar(): void {
    const dish = new DishForm("platillo x", 567, "platillo prueba");
    this.dishService
      .updateDish(
        this.restauratID,
        this.myDish.category,
        this.myDish.id,
        null,
        null,
        dish
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  cerrar() {
    this.modalRef.hide();
  }

  showPreview(event, opcion) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    if (opcion == 1) {
      this.editForm.patchValue({
        imagePurl: file,
      });
      this.editForm.get("imagePurl").updateValueAndValidity();
      reader.onload = () => {
        this.imagePurl = reader.result as string;
      };
    }

    if (opcion == 2) {
      this.editForm.patchValue({
        imageARurl: file,
      });
      this.editForm.get("imageARurl").updateValueAndValidity();
      reader.onload = () => {
        this.imageARurl = reader.result as string;
      };
    }

    reader.readAsDataURL(file);
  }

  get f() {
    return this.editForm.controls;
  }

  submit() {
    console.log(this.editForm.value);
    console.log(this.editForm.value.file);
  }
}
