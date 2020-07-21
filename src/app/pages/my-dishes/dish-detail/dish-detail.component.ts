import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { DishService } from "../../../services/dish.service";
import { StorageService } from "src/app/services/storage.service";
import { DishForm } from "src/app/constants/form/dish.form";
import { BsModalService } from "ngx-bootstrap/modal";
import { ModalDishComponent } from "../modal-dish/modal-dish.component";

@Component({
  selector: "app-dish-detail",
  templateUrl: "./dish-detail.component.html",
  styleUrls: ["./dish-detail.component.scss"],
})
export class DishDetailComponent implements OnInit {
  private location: Location;
  private route: ActivatedRoute;
  private myDish: any = { category: "", imageURLs: [], status: "APPROVED" };
  public restaurantID: string;
  statusClass: string = "";
  statusText: string = "";
  isPng: string = "dish-body-span-hide";
  loading: boolean = false;

  constructor(
    loc: Location,
    route: ActivatedRoute,
    private dishService: DishService,
    private storageService: StorageService,
    private modalService: BsModalService
  ) {
    this.location = loc;
    this.route = route;
    this.restaurantID = this.storageService.getCurrentRestaurantID();
  }

  ngOnInit() {
    this.getDish();
  }

  getDish() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get("id");
    const cat = this.route.snapshot.paramMap.get("cat");
    console.log(cat, "cat");
    this.dishService.getRestaurantDish(id, cat, this.restaurantID).subscribe(
      (response) => {
        this.loading = false;
        this.myDish = response;
        this.statusClass = response.status;
        this.statusText = response.status;
        this.valuatePNG(response.bucketARImageID);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  valuatePNG(image: string) {
    let imgExt = image.split(".")[1];
    if (imgExt && imgExt != "png") this.isPng = "fas fa-info-circle";
    this.isPng = "";
  }

  getStatusValue(val: string) {
    switch (val) {
      case "PENDING":
        return "validator ";
      case "REJECTED":
        return "validator ";
      case "APPROVED":
        return "validator ";
      default:
        return "validator ";
    }
  }

  getBgColor(value: string) {
    switch (value) {
      case "PENDING":
        return "#e3dede";
      case "REJECTED":
        return "#ed7872";
      default:
        return "#c6fa87";
    }
  }
  getColor(value: string) {
    switch (value) {
      case "PENDING":
        return "#878686";
      case "REJECTED":
        return "#e32a20";
      default:
        return "#5aa832";
    }
  }

  getTrans(value: string) {
    switch (value) {
      case "PENDING":
        return "Pendiente";
      case "REJECTED":
        return "Rechazado";
      default:
        return "Validado";
    }
  }

  openDishModal() {
    const modal = this.modalService.show(ModalDishComponent, {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg modal-dialog-centered",
    });
    console.log(this.myDish);
    modal.content.title = this.myDish.name;
    modal.content.dish = this.myDish;
    modal.content.isEdit = true;
    modal.content.restaurantID = this.restaurantID;
    modal.content.buttonText = "Editar";
  }
}
