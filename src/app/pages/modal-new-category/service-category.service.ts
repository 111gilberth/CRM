import { Injectable } from '@angular/core';
import {  category } from './cliente.model';
import { ModalNewCategoryComponent } from './modal-new-category.component';
import { GestureConfig } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { ArrayType } from '@angular/compiler';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {

 private categorynew: category[];

  constructor() { this.categorynew = []}
  getCategory() {
    return this.categorynew;
  }

  addCategory(categorynew: category) {
    this.categorynew.push(categorynew);
  }

  newCategory(): category {
    return {
      name: '',
    };
  }  
}