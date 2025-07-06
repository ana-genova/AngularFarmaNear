import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from '../../../shared/components/input-text/input-text.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-accreditation',
  imports: [
    InputTextComponent,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './accreditation.component.html',
})
export class AccreditationComponent {

  protected form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      user: new FormControl(),
      password: new FormControl()
    });
  }
}
