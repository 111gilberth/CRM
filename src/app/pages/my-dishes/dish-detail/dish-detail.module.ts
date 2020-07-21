import { NgModule } from "@angular/core";
import { DishDetailComponent } from "./dish-detail.component";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "src/app/app-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ValidatorModule } from "src/commons/validator/validator.module";
import { DishService } from "src/app/services/dish.service";
import { MyDishesModule } from "../my-dishes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { CustomInputModule } from "src/commons/custom-input/custom-input.module";

@NgModule({
  declarations: [DishDetailComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ValidatorModule,
    MyDishesModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CustomInputModule,
  ],
  exports: [DishDetailComponent],
  providers: [DishService],
})
export class DishDetailModule {}
