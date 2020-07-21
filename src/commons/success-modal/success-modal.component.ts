import { Component, Input, EventEmitter, TemplateRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
@Component({
  selector: "app-success-modal",
  templateUrl: "./success-modal.component.html",
  styleUrls: ["./success-modal.component.scss"],
})
export class SuccessModalComponent {
  constructor(private modalRef: BsModalRef) {}

  closeModal() {
    this.modalRef.hide();
  }

  public ngOnInit(): void {}
}
