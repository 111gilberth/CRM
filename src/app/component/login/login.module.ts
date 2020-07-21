import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputModule } from 'src/commons/custom-input/custom-input.module';
import { ButtonModule } from 'src/commons/button/button.module';
import { MatInputModule } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        CustomInputModule,
        ButtonModule,
        MatInputModule
    ],
    exports: [LoginComponent],
    providers:[
      UserService,
      StorageService
    ]
  })
  export class LoginModule { }