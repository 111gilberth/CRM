import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserForm } from "../constants/form/user.form";
import { environment } from "src/environments/environment.qa";
import { StorageService } from "./storage.service";
import { RestaurantForm } from "../constants/form/restaurant.form";

export const usersApiBaseUrl = environment.serverUrl;

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public signInUser(userForm: UserForm) {
    return this.http.post(
      usersApiBaseUrl + "/blackdish/users/sign-in",
      userForm
    );
  }

  public getRestaurantdetail(restaurantID: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken(),
    });
    return this.http.get(
      usersApiBaseUrl + "/blackdish/restaurants/" + restaurantID,
      {
        headers,
      }
    );
  }

  public updateRestaurantdetail(
    restaurantID: string,
    restaurantForm: RestaurantForm
  ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken(),
    });
    return this.http.put(
      usersApiBaseUrl + "/blackdish/restaurants/" + restaurantID,
      restaurantForm,
      {
        headers,
      }
    );
  }
}
