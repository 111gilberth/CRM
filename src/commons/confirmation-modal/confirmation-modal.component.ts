import { Component, Input, EventEmitter, TemplateRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { DishService } from "../../app/services/dish.service";
import { Location } from "@angular/common";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-confirmation-modal",
  templateUrl: "./confirmation-modal.component.html",
  styleUrls: ["./confirmation-modal.component.scss"],
})
export class ConfirmationModalComponent {
  public btnCancel: string;
  public btnIn: string;
  public modalTitle: string;
  public modalSubtitle: string;
  public modalIcon: string;
  public btnTitleOne: string;
  public btnTitleTwo: string;
  public modalClass: string;
  public modalTarget: string;
  @Input() public buttonClass: string;
  @Input() public button: string;
  @Input() public buttonValue: string;
  private modalRef: BsModalRef;
  @Input() private myDish: any;

  constructor(
    private modalService: BsModalService,
    private dishService: DishService,
    private location: Location
  ) {}

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    if (this.buttonValue == "delete") {
      console.log(this.myDish);
      this.dishService.deleteDish(this.myDish.dishID).subscribe((response) => {
        this.modalRef.hide();
        this.location.back();
      });
    }
  }

  public ngOnInit(): void {
    switch (this.buttonValue) {
      case "delete": {
        this.modalTarget = "#modal";
        this.modalTitle = "¿Estás seguro de querer eliminar este platillo?";
        this.modalSubtitle =
          "Una vez eliminado, los datos no podrán ser recuperados.";
        this.modalIcon = "priority_high";
        this.btnTitleOne = "Cancelar";
        this.btnTitleTwo = "Eliminar";
        this.modalClass = "icon-box";
        this.btnCancel = "btn-cancel btn-focus-cancel";
        this.btnIn = "btn-delete btn-focus";
        break;
      }
      case "successfull": {
        this.modalTarget = "#modal";
        this.modalTitle = "Platillo agregado correctamente!";
        this.modalSubtitle = "";
        this.modalIcon = "check";
        this.btnTitleTwo = "Aceptar";
        this.modalClass = "icon-box-u";
        this.btnCancel = "btn-cancel btn-focus-cancel";
        this.btnIn = "btn-success btn-focus-in";
        break;
      }
      default: {
        break;
      }
    }
  }
}
