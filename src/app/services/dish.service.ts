import { Injectable } from "@angular/core";
import { Dish } from "../constants/dishes/Dish";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.qa";
import { StorageService } from "./storage.service";

export const usersApiBaseUrl = environment.serverUrl;

@Injectable({
  providedIn: "root"
})
export class DishService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getDishes(restauranID: string, categoryID: string, page) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken()
    });
    let params = new HttpParams().set("page", page).set("pagination", "false");

    return this.http.get(
      usersApiBaseUrl +
        "/blackdish/restaurants/" +
        restauranID +
        "/categories/" +
        categoryID +
        "/dishes",
      { headers, params }
    );
  }

  getRestaurantDish(dishID: string, categoryID: string, restaurantID: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken()
    });

    return this.http.get<Dish>(
      usersApiBaseUrl +
        "/blackdish/restaurants/" +
        restaurantID +
        "/categories/" +
        categoryID +
        "/dishes/" +
        dishID,
      { headers }
    );
  }

  deleteDish(dishID: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken()
    });
    return this.http.delete(usersApiBaseUrl + "/blackdish/dishes/" + dishID, {
      headers
    });
  }

  getCategories(restaurantID: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken()
    });
    return this.http.get(
      usersApiBaseUrl +
        "/blackdish/restaurants/" +
        restaurantID +
        "/categories",
      { headers }
    );
  }

  public createNewDish(
    restaurantID: string,
    categoryID: string,
    ar,
    coverPage,
    dishform
  ) {
    console.log("cover-page", coverPage);
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken()
    });
    const formData = new FormData();
    formData.append(
      "dish",
      new Blob(
        [
          JSON.stringify({
            name: dishform.name,
            description: dishform.description,
            price: dishform.price
          })
        ],
        {
          type: "application/json"
        }
      )
    );

    if (coverPage) {
      formData.append("coverPage", coverPage);
    }
    if (ar) {
      console.log("entroo");
      formData.append("ar", ar);
    }
    return this.http.post(
      usersApiBaseUrl +
        "/blackdish/restaurants/" +
        restaurantID +
        "/categories/" +
        categoryID +
        "/dishes",
      formData,
      { headers }
    );
  }

  public updateDish(
    restaurantID: string,
    categoryID: string,
    dishID: string,
    ar: File,
    coverPage: File,
    dishform
  ) {
    console.log("entra service", categoryID);
    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.storageService.getCurrentToken()
    );

    const formData = new FormData();
    formData.append(
      "dish",
      new Blob(
        [
          JSON.stringify({
            name: dishform.name,
            description: dishform.description,
            price: dishform.price
          })
        ],
        {
          type: "application/json"
        }
      )
    );

    if (coverPage) {
      formData.append("coverPage", coverPage);
    }
    if (ar) {
      console.log("entroo");
      formData.append("ar", ar);
    }
    return this.http.put(
      usersApiBaseUrl +
        "/blackdish/restaurants/" +
        restaurantID +
        "/categories/" +
        categoryID +
        "/dishes/" +
        dishID,
      formData,
      { headers }
    );
  }
}
