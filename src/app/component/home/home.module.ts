import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material";
import { ModalMembershipComponent } from "src/app/pages/modal-membership/modal-membership.component";
import { HomeComponent } from "./home.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountModule } from "src/app/pages/account/account.module";
import { MyDishesModule } from "src/app/pages/my-dishes/my-dishes.module";
import { ModalMembershipModule } from "src/app/pages/modal-membership/modal-membership.module";
import { ValidatorModule } from "src/commons/validator/validator.module";
import { ModalNewCategoryModule } from "src/app/pages/modal-new-category/modal-new-category.module";
import { DishDetailModule } from "src/app/pages/my-dishes/dish-detail/dish-detail.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    AccountModule,
    MyDishesModule,
    ModalMembershipModule,
    ModalNewCategoryModule,
    ValidatorModule,
    DishDetailModule,
  ],
  exports: [HomeComponent],
  entryComponents: [ModalMembershipComponent],
})
export class HomeModule {}
