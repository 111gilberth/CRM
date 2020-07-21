import { NgModule } from "@angular/core";
import { AccountComponent } from "./account.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MatInputModule } from "@angular/material";
import { CustomInputModule } from "src/commons/custom-input/custom-input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/commons/button/button.module";
import { UserService } from "src/app/services/user.service";
import { ModalModule } from "ngx-bootstrap/modal";
import { SuccessModalComponent } from "src/commons/success-modal/success-modal.component";

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomInputModule,
    ButtonModule,
    MatInputModule,
    ModalModule.forRoot(),
  ],
  exports: [AccountComponent],
  providers: [UserService],
})
export class AccountModule {}
