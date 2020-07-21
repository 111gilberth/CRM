import { Injectable } from "@angular/core";
import { Category } from "../constants/model/category";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { environment } from "src/environments/environment.qa";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
} from "rxjs/operators";
import { Observable, of } from "rxjs";
import { CategoryForm } from "../constants/form/category.form";
import { CategoriesObserver } from "src/app/constants/menu/categoriesObserver";

export const usersApiBaseUrl = environment.serverUrl;

@Injectable({
  providedIn: "root",
})
export class ServiceCategoryService {
  private categorynew: Category[];
  private observers: CategoriesObserver[] = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.categorynew = [];
  }
  getCategory() {
    return this.categorynew;
  }

  subscribe(obs: CategoriesObserver) {
    this.observers.push(obs);
  }

  getObservers(): CategoriesObserver[] {
    return this.observers;
  }

  addCategory(categorynew: Category) {
    console.log(categorynew, "categorynew");
    let catN = {
      name: categorynew.name,
      id: categorynew.id,
      restaurantID: this.storageService.getCurrentRestaurantID(),
    };
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken(),
    });
    let r = this.http.post(usersApiBaseUrl + "/blackdish/categories", catN, {
      headers,
    });
    for (let i in this.observers) {
      this.observers[i].notify(categorynew.name);
    }
    return r;
  }

  newCategory(): Category {
    return {
      id: "",
      name: "",
      selected: false,
    };
  }
  public getAllCategories(restaurantID: string, hint: any): Observable<any> {
    let params = new HttpParams().set("hint", hint.name);
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken(),
    });
    return this.http.get(usersApiBaseUrl + "/blackdish/categories", {
      headers,
      params,
    });
  }
}
