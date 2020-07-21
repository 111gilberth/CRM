import { NgModule } from "@angular/core";
import { ModalNewCategoryComponent } from "./modal-new-category.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "../../../commons/button/button.module";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../shared/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalModule } from "ngx-bootstrap/modal";
import { SuccessModalComponent } from "src/commons/success-modal/success-modal.component";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { SuccessModule } from "src/commons/success-modal/success.module";

@NgModule({
  declarations: [ModalNewCategoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ButtonModule,
    ModalModule.forRoot(),
    NgxDatatableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    SuccessModule,
  ],
  exports: [ModalNewCategoryComponent, ModalNewCategoryComponent],
})
export class ModalNewCategoryModule {}
