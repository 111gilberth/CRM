import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent implements OnInit {
  @Input() public ValueType:string;
  @Input() public ValueClass:string;
  public ValidClass:string;

  constructor() { }

  public ngOnInit() {
    switch(this.ValueClass){
      case "val":{
        this.ValidClass = "val-span"
        break;
      }
       case "rec":{
         this.ValidClass = "rec-span"
         break;
       }
       case "env":{
         this.ValidClass = "env-span"
         break;
       }
       default:{
         this.ValidClass = this.ValueClass;
         break;
       }
    }


  }

}

