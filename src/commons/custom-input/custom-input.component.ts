import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],

   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]

})

export class CustomInputComponent implements OnInit, ControlValueAccessor{
  @Input()  label:string;
  @Input()  title: string;
  @Input()  placeHolder: string;
  @Input()  inputType:string;
  @Input()  valueClass:string;
  @Output() inputModelChange = new EventEmitter<string>();
  public myclass: boolean;
  public asterisk: boolean;
  public validClass:string;

  onChange: any = () => {}
   onTouch: any = () => {}
   registerOnChange(fn: any): void {
     this.onChange = fn;
   }
   registerOnTouched(fn: any): void {
     this.onTouch = fn;
   }

   input: string;
  writeValue(input: string) {
    this.input = input;
  }


  constructor() { }

  public ngOnInit() {
 switch(this.valueClass){
      case "valueLogin":{
        this.validClass = "login-style"
        this.myclass=false;
        this.asterisk=false;
        break;
      }
       case "valueForm":{
         this.validClass = "form-control"
         this.myclass=true;
         this.asterisk=true;
         break;
       }
       default:{
         break;
       }
    }
  }

}

