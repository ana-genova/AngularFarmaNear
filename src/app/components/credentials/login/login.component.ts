import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from '../../../shared/components/input-text/input-text.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    InputTextComponent,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  protected form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      user: new FormControl(),
      password: new FormControl()
    });
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }
}
