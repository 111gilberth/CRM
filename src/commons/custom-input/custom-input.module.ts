import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CustomInputComponent} from './custom-input.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomInputComponent
  ],
  exports:[
    CustomInputComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class CustomInputModule { }
