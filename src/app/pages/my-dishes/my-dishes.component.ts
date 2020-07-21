import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Dish } from "../../constants/dishes/Dish";
import { DishService } from "../../services/dish.service";
import { MenuService } from "../../services/menu.service";
import { StorageService } from "src/app/services/storage.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { ModalDishComponent } from "./modal-dish/modal-dish.component";

@Component({
  selector: "app-my-dishes",
  templateUrl: "./my-dishes.component.html",
  styleUrls: ["./my-dishes.component.scss"]
})
export class MyDishesComponent implements OnInit {
  public selectedMenu: string;
  public tableRows: Dish[];
  public columns = [
    { prop: "dishID", name: "#" },
    { prop: "name", name: "Nombre de platillo" },
    { prop: "price", name: "Precio" },
    { prop: "calification", name: "Calificación" },
    { prop: "createDate", name: "Fecha de creación" },
    { prop: "status", name: "Estado" },
    { prop: "imageURL", name: "Imagen" }
  ];
  selectedFilter: string = "Mejor Calificadas";
  selectedCategory: string;
  uploadedQty = 0;
  loading: boolean = false;
  sorter: any = [
    {
      prop: "calification",
      dir: "asd"
    }
  ];
  openSearch: boolean = false;
  searchText: string = "";
  dishes: any = { pending: 0, rejected: 0, validate: 0 };
  restaurantID: string;

  constructor(
    private dishService: DishService,
    private menuService: MenuService,
    private storageService: StorageService,
    private modalService: BsModalService
  ) {
    this.restaurantID = this.storageService.getCurrentRestaurantID();
  }
  ngOnInit() {
    this.getDishCategories();
    this.menuService.subscribe(this);
  }

  getDishCategories() {
    this.dishService.getCategories(this.restaurantID).subscribe(response => {
      console.log(response[0].id);
      this.selectedCategory = response[0].id;
      if (this.selectedCategory) {
        this.getAllDishes(this.selectedCategory);
      }
    });
  }
  getValue(val) {
    switch (val) {
      case "PENDING":
        return "env";
      case "APPROVED":
        return "val";
      case "REJECTED":
        return "rec";
      default:
        return "rec";
    }
  }

  setFilter(val: string) {
    this.selectedFilter = val;
    switch (val) {
      case "Mejor calificados":
        this.sorter[0].prop = "calification";
        break;
      case "Nombre":
        this.sorter[0].prop = "name";
        break;
      case "Recientes":
        this.sorter[0].prop = "createDate";
        break;
    }
    this.tableRows = [...this.tableRows];
  }

  notify(item: string): void {
    this.selectedCategory = item;
    this.loading = true;
    this.dishService.getDishes(this.restaurantID, item, 1).subscribe(
      response => {
        this.loading = false;
        this.dishes = response;
        this.tableRows = [...this.dishes.dishes];
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllDishes(category: string) {
    this.loading = true;
    this.dishService
      .getDishes(this.restaurantID, category, 1)
      .subscribe(response => {
        this.loading = false;
        this.dishes = response;
        this.tableRows = [...this.dishes.dishes];
      });
  }

  changeTable(event) {
    this.loading = true;
    this.dishService
      .getDishes(this.restaurantID, this.selectedCategory, event.page)
      .subscribe(
        response => {
          this.loading = false;
          this.dishes = response;
          this.tableRows = [...this.dishes.dishes];
        },
        error => {
          console.log(error);
        }
      );
  }

  toggleSearch($event) {
    let dishName = this.searchText;
    let dishes = [];
    if ($event == undefined) {
      this.openSearch = !this.openSearch;
      if (this.openSearch == false) {
        if (this.searchText == "") {
          this.getAllDishes(this.selectedCategory);
          return;
        }

        for (let i in this.dishes.dishes) {
          if (
            this.dishes.dishes[i].name.toLowerCase() == dishName.toLowerCase()
          ) {
            dishes.push(this.dishes.dishes[i]);
          }
        }
        this.tableRows = [...dishes];
        this.searchText = "";
      }
    } else {
      if ($event.key == "Enter") {
        if (this.searchText == "") {
          this.getAllDishes(this.selectedCategory);
          return;
        }
        for (let i in this.dishes.dishes) {
          if (
            this.dishes.dishes[i].name.toLowerCase() == dishName.toLowerCase()
          ) {
            dishes.push(this.dishes.dishes[i]);
          }
        }
        this.tableRows = [...dishes];
      }
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
  getDate(val) {
    return new Date(val).toLocaleString().split(" ")[0];
  }

  openDishModal() {
    const modal = this.modalService.show(ModalDishComponent, {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg modal-dialog-centered"
    });
    modal.content.title = "Crear platillo";
    modal.content.isEdit = false;
    modal.content.restaurantID = this.restaurantID;
    modal.content.buttonText = "Guardar";
  }
}
