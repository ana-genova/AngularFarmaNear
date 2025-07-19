import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
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
export class InputTextComponent implements AfterViewInit {

  @ViewChild('inputElement')
  input!: ElementRef<HTMLInputElement>;

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
  formControl!: FormControl;

  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter<any>();

  private _value: any;

  onChange: (value: any) => void = () => {
  };
  onTouched: () => void = () => {
  };

  ngAfterViewInit(): void {
    if (this.formControl) {
      this.formControl.valueChanges.subscribe((value) => {
        if (this._value !== value) {
          this.valueChanged.emit(value);
        }
      });
    }
  }

  writeValue(value: any): void {
    if (this._value !== value) {
      this._value = value;
      if (this.formControl) {
        this.formControl.setValue(value, {emitEvent: false});
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl?.disable() : this.formControl?.enable();
  }

  onInput(target: any): void {
    this._value = target.value;
    this.onChange(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  focus(): void {
    setTimeout(() => this.input?.nativeElement.focus(), 300);
  }

  protected get errorMessage(): string {
    if (!this.formControl || !this.formControl.errors) {
      return '';
    }
    return this.formControl.errors['errorMessage'] ?? '';
  }
}
