import { SuccessModalComponent } from "./success-modal.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatInputModule, MatButtonModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from "ngx-bootstrap/modal";
import { ButtonModule } from "../button/button.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SuccessModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    NgbModule,
  ],
  exports: [SuccessModalComponent],
})
export class SuccessModule {}
