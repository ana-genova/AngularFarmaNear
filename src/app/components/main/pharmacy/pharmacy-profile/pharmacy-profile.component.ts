import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextComponent} from "../../../../shared/components/input-text/input-text.component";
import {ValidatorsUtils} from '../../../../shared/utils/validators.utils';

@Component({
  selector: 'app-pharmacy-profile',
  imports: [
    FormsModule,
    InputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pharmacy-profile.component.html',
  styleUrl: './pharmacy-profile.component.scss'
})
export class PharmacyProfileComponent {

  protected form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      cnpj: new FormControl(null, [ValidatorsUtils.required]),
      name: new FormControl(null, [ValidatorsUtils.required]),
      email: new FormControl(null, [ValidatorsUtils.required]),
      phone: new FormControl(null),
    });
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }

  submit() {

  }
}
