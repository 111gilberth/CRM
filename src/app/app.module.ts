import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CustomInputModule } from '../commons/custom-input/custom-input.module';
import { ValidatorComponent } from '../commons/validator/validator.component';
import { ButtonModule } from "src/commons/button/button.module";
import { ModalNewCategoryComponent } from '../app/pages/modal-new-category/modal-new-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./component/home/home.module";
import { SharedModule } from "./shared/shared.module";
import { LoginModule } from "./component/login/login.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { StorageService } from "./services/storage.service";
import { AuthorizatedGuard } from "./services/authorizated.guard";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RegisterComponent } from './component/register/register.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    SharedModule,
    LoginModule,
    NgbModule,
    FormsModule,
    CustomInputModule,
    MatInputModule,
    ButtonModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [StorageService, AuthorizatedGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
