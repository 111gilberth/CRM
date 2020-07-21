import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Router } from "@angular/router";
import { StorageService } from "src/app/services/storage.service";
import { MenuService } from "src/app/services/menu.service";
import { DishService } from "src/app/services/dish.service";
import { Category } from "src/app/constants/model/category";
import { ServiceCategoryService } from "src/app/services/service-category.service";
import { CategoriesObserver } from "src/app/constants/menu/categoriesObserver";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          display: "none",
          opacity: 0.1,
        })
      ),
      state(
        "out",
        style({
          display: "block",
          opacity: 1,
        })
      ),
      transition("in => out", animate("100ms linear")),
      transition("out => in", animate("300ms linear")),
    ]),
  ],
})
export class SideMenuComponent implements OnInit, CategoriesObserver {
  public menuState: string = "in";
  restaurantID: string = "fd6fad22-0a34-4edf-85bb-58f2c068b47e";
  public categoryItems;
  selected: boolean;
  arrayNewCategory: Category[];

  @Output() menuItemChange = new EventEmitter<string>();

  constructor(
    private menuService: MenuService,
    private storageService: StorageService,
    public router: Router,
    private dishService: DishService,
    private serviceCategory: ServiceCategoryService
  ) {}
  ngOnInit() {
    this.getDishCategories();
    this.categoryItems = this.serviceCategory.getCategory();
    this.serviceCategory.subscribe(this);
  }

  notify() {
    this.getDishCategories();
  }

  toggleMenu() {
    this.menuState = this.menuState === "out" ? "in" : "out";
    this.router.navigate(["dashboard/my-dishes"]);
  }

  selectItem(item: string) {
    this.categoryItems[0].selected = false;
    this.menuService.changeCat(item);
    for (let i in this.categoryItems) {
      if (this.categoryItems[i].name == item) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    }
  }

  public openAccount() {
    this.menuState = "in";
    this.router.navigate(["/dashboard/account"]);
  }

  public logout() {
    this.storageService.logout();
  }

  getDishCategories() {
    this.dishService.getCategories(this.restaurantID).subscribe(
      (response) => {
        this.categoryItems = response;
        this.categoryItems[0].selected = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
