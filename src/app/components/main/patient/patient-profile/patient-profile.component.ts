import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

import {InputTextComponent} from "../../../../shared/components/input-text/input-text.component";
import {ValidatorsUtils} from '../../../../shared/utils/validators.utils';
import {DataGridComponent} from '../../../../shared/components/grid/data-grid.component';
import {DataGridButtons} from '../../../../shared/interface/data-grid.interface';

@Component({
  selector: 'app-patient-profile',
  imports: [
    FormsModule,
    InputTextComponent,
    ReactiveFormsModule,
    DataGridComponent
  ],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent {

  protected form: FormGroup;
  medicineButtons: Array<DataGridButtons> = [
    {id: 1, label: 'Adicionar', icon: 'fas fa-plus', type: 'success', action: (row) => console.log('Editar', row)},
    {id: 2, label: 'Editar', icon: 'fas fa-pen', type: 'normal', action: (row) => console.log('Editar', row)},
    {id: 3, label: 'Deletar', icon: 'fas fa-trash', type: 'danger', action: (row) => console.log('Editar', row)},
  ];

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      zip_code: new FormControl(null, [ValidatorsUtils.required]),
      name: new FormControl(null, [ValidatorsUtils.required]),
      email: new FormControl(null, [ValidatorsUtils.required]),
      mobile_phone: new FormControl(null, [ValidatorsUtils.required]),
      street: new FormControl(null),
      neighborhood: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      cep: new FormControl(null),
    });
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }

  protected submit(): void {
    if (ValidatorsUtils.formIsInvalid(this.form)) {
      return;
    }
  }
}
