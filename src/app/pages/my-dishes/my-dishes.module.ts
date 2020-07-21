import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MyDishesComponent } from "./my-dishes.component";
import { ValidatorComponent } from "src/commons/validator/validator.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ValidatorModule } from "src/commons/validator/validator.module";
import { DishService } from "src/app/services/dish.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ConfirmationModalComponent } from "src/commons/confirmation-modal/confirmation-modal.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { ModalDishComponent } from "./modal-dish/modal-dish.component";
import { CustomInputModule } from "src/commons/custom-input/custom-input.module";
import { SuccessModalComponent } from "src/commons/success-modal/success-modal.component";
import { SuccessModule } from "src/commons/success-modal/success.module";

@NgModule({
  declarations: [
    MyDishesComponent,
    ConfirmationModalComponent,
    ModalDishComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    AppRoutingModule,
    SharedModule,
    ValidatorModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule,
    CustomInputModule,
    SuccessModule,
  ],
  exports: [MyDishesComponent, ConfirmationModalComponent],
  entryComponents: [ModalDishComponent, SuccessModalComponent],
  providers: [DishService],
})
export class MyDishesModule {}
