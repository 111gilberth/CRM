import { environment } from 'src/environments/environment.qa';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { CategoryForm } from '../constants/form/category.form';

export const usersApiBaseUrl = environment.serverUrl;

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public getAllCategories(restaurantID: string, hint:string ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken()
    });
    return this.http.get(usersApiBaseUrl + "/blackdish/categories", {
      headers
    });
  }

  public createNewCategory(categoryForm: CategoryForm ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.storageService.getCurrentToken()
    });
    return this.http.post(usersApiBaseUrl + "/blackdish/categories", {
      headers,
      observe: categoryForm
    });
  }
}