import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

import {InputTextComponent} from "../../../../shared/components/input-text/input-text.component";
import {ValidatorsUtils} from '../../../../shared/utils/validators.utils';
import {DataGridComponent} from '../../../../shared/components/grid/data-grid.component';
import {DataGridButtons} from '../../../../shared/interface/data-grid.interface';
import {EndpointUtils} from '../../../../shared/utils/endpoint.utils';
import {SharedUtils} from '../../../../shared/utils/shared.utils';
import {WaitingScreen} from '../../../../shared/utils/waiting-screen.utils';
import {finalize} from 'rxjs';
import {ToastUtils} from '../../../../shared/utils/toast.utils';
import {PayloadService} from '../../../../shared/service/payload.service';
import {RequestService} from '../../../../shared/service/request.service';

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
export class PatientProfileComponent implements OnInit {

  protected form: FormGroup;
  protected disableSubmitButton: boolean = false;

  medicineButtons: Array<DataGridButtons> = [
    {id: 1, label: 'Adicionar', icon: 'fas fa-plus', type: 'success', action: (row) => console.log('Editar', row)},
    {id: 2, label: 'Editar', icon: 'fas fa-pen', type: 'normal', action: (row) => console.log('Editar', row)},
    {id: 3, label: 'Deletar', icon: 'fas fa-trash', type: 'danger', action: (row) => console.log('Editar', row)},
  ];

  constructor(private _formBuilder: FormBuilder,
              private _payloadService: PayloadService,
              private _requestService: RequestService) {
    this.form = this._formBuilder.group({
      id: new FormControl(null),
      cpf: new FormControl(null, [ValidatorsUtils.required]),
      name: new FormControl(null, [ValidatorsUtils.required]),
      email: new FormControl(null, [ValidatorsUtils.required]),
      mobilePhone: new FormControl(null, [ValidatorsUtils.required]),
      street: new FormControl(null, [ValidatorsUtils.required]),
      neighborhood: new FormControl(null, [ValidatorsUtils.required]),
      city: new FormControl(null, [ValidatorsUtils.required]),
      number: new FormControl(null, [ValidatorsUtils.required]),
      state: new FormControl(null, [ValidatorsUtils.required]),
      zipCode: new FormControl(null, [ValidatorsUtils.required]),
    });
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }

  ngOnInit(): void {
    const login = this._payloadService.login;
    if (!login) {
      return;
    }

    WaitingScreen.show();
    this._requestService.get$(`${new EndpointUtils().ApiPatient.READ}/${login}`)
      .pipe(finalize(() => WaitingScreen.hide()))
      .subscribe({
      next: (response: any) => {
        this.disableSubmitButton = true;
        response.cpf = SharedUtils.formatCPF(response.cpf);
        this.form.setValue(response)
      },
      error: () => this.form.patchValue({
        cpf: SharedUtils.formatCPF(login),
        name: this._payloadService.name
      })
    });
  }

  protected submit(): void {
    if (ValidatorsUtils.formIsInvalid(this.form)) {
      return;
    }

    WaitingScreen.show();
    const updateValue = this.form.value;
    updateValue.cpf = SharedUtils.normalizeDocument(updateValue.cpf);

    this._requestService.post$(this.form.value, new EndpointUtils().ApiPatient.FINISH_CREATION)
      .pipe(finalize(() => WaitingScreen.hide()))
      .subscribe(() => ToastUtils.success('Informações atualizadas com sucesso'));
  }
}
