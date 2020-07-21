import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/commons/button/button.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule
  ],
  exports:[
    SideMenuComponent
  ]
})
export class SharedModule { }
