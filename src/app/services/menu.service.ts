import { Injectable } from "@angular/core";
import { MenuObserver } from "../constants/menu/menuObserver";
import { DishService } from "./dish.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  private observers: MenuObserver[] = [];
  private selectedCat: string = "";
  constructor() {}

  changeCat(catName: string) {
    this.selectedCat = catName;
    this.notify();
  }

  subscribe(obs: MenuObserver) {
    this.observers.push(obs);
  }

  private notify() {
    for (let i in this.observers) {
      this.observers[i].notify(this.selectedCat);
    }
  }
}
