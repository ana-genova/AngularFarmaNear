import {Component, Input} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputTextComponent,
      multi: true
    }
  ],
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    NgClass,
    FormsModule
  ],
})
export class InputTextComponent {

  @Input()
  gradient: 'none' | 'left' | 'right' = 'none';

  @Input()
  cssClass: string = '';

  @Input()
  placeholder: string = '';

  @Input()
  icon: string = '';

  @Input()
  height: string = '';

  @Input()
  formControl: FormControl;

  value: any;
  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    this.formControl = new FormControl();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
