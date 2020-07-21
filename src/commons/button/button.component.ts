import { Component, Input, EventEmitter } from "@angular/core";

@Component({
    selector: "custom-button",
    templateUrl: "./button.component.html"
})
export class ButtonComponent {
    @Input() buttonType: string;
    @Input() buttonLabel: string;
    @Input() buttonClass: string;
    @Input() iconClass: string;
    @Input() click: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

   public onClick (){
       this.click.emit();
   }
}

