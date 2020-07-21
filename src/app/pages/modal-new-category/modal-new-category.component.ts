import { Component, Input, OnInit } from "@angular/core";
import { ServiceCategoryService } from "src/app/services/service-category.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { SuccessModalComponent } from "src/commons/success-modal/success-modal.component";
import { Category } from "src/app/constants/model/category";
import { StorageService } from "src/app/services/storage.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
} from "rxjs/operators";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "app-modal-new-category",
  templateUrl: "./modal-new-category.component.html",
  styleUrls: ["./modal-new-category.component.scss"],
})
export class ModalNewCategoryComponent implements OnInit {
  canSave: boolean = true;
  restaurantID: string;
  categoryLocal: Category;
  dataSource: Observable<any>;
  constructor(
    private serviceCategory: ServiceCategoryService,
    private modalService: BsModalService,
    private storageService: StorageService
  ) {
    this.restaurantID = this.storageService.getCurrentRestaurantID();
    this.dataSource = Observable.create((observer: any) => {
      console.log(observer);
      console.log(this.categoryLocal);

      observer.next(this.categoryLocal);
    }).pipe(
      mergeMap((token: string) =>
        this.serviceCategory.getAllCategories(this.restaurantID, token)
      )
    );
  }

  ngOnInit() {
    this.categoryLocal = this.serviceCategory.newCategory();
  }
  public onChange() {
    this.canSave = this.categoryLocal.name.trim() == "";
  }

  public newCategory(): void {
    if (this.categoryLocal.name.trim() == "") {
      alert("Debes ingresar un nombre de categoria");
    } else {
      this.serviceCategory.addCategory(this.categoryLocal).subscribe(cat => {
        this.categoryLocal = this.serviceCategory.newCategory();
        let obs = this.serviceCategory.getObservers();
        for(let i in obs){
          obs[i].notify(this.categoryLocal.name);
        }
        document.getElementById("category").click();
        this.openModalConfirmation();
        this.canSave = true;
      },
      error => {
        console.log(error);
        if(error.status == 409){
          alert('Nombre de categoria ya existe, selecciona desde la lista');
          return;
        }
        alert('Error al crear la categoria, Intenta de nuevo');
      });
    }
  }

  openModalConfirmation() {
    const modal = this.modalService.show(SuccessModalComponent);
  }

  onSelect($event){
    this.categoryLocal = $event.item;
  }
}