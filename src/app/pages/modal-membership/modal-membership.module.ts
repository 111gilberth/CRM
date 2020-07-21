import { NgModule } from '@angular/core';
import { ModalMembershipComponent } from './modal-membership.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'src/commons/button/button.module';

@NgModule({
    declarations: [
      ModalMembershipComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      ButtonModule
    ],
    exports: [ModalMembershipComponent]
  })
  export class ModalMembershipModule { }