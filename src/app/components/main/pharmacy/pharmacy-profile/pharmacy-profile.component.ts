import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextComponent} from "../../../../shared/components/input-text/input-text.component";
import {ValidatorsUtils} from '../../../../shared/utils/validators.utils';
import {RequestService} from '../../../../shared/service/request.service';
import {EndpointUtils} from '../../../../shared/utils/endpoint.utils';
import {PayloadService} from '../../../../shared/service/payload.service';
import {ToastUtils} from '../../../../shared/utils/toast.utils';
import {SharedUtils} from '../../../../shared/utils/shared.utils';
import {WaitingScreen} from '../../../../shared/utils/waiting-screen.utils';
import {finalize} from 'rxjs';

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
export class PharmacyProfileComponent implements OnInit {

  protected form: FormGroup;
  protected disableSubmitButton: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _payloadService: PayloadService,
              private _requestService: RequestService) {
    this.form = this._formBuilder.group({
      id: new FormControl(null),
      cnpj: new FormControl(null, [ValidatorsUtils.required]),
      name: new FormControl(null, [ValidatorsUtils.required]),
      email: new FormControl(null, [ValidatorsUtils.required, Validators.email]),
      phone: new FormControl(null, [ValidatorsUtils.required]),
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
    this._requestService.get$(`${new EndpointUtils().ApiPharmacy.DRUGSTORE}?cnpj=${login}`)
      .pipe(finalize(() => WaitingScreen.hide()))
      .subscribe({
        next: (response: any) => {
          this.disableSubmitButton = true;
          response.cnpj = SharedUtils.formatCNPJ(response.cnpj);
          this.form.setValue(response)
        },
        error: () => this.form.patchValue({
          cnpj: SharedUtils.formatCNPJ(login),
          name: this._payloadService.name,
        })
      });
  }

  protected submit(): void {
    if (ValidatorsUtils.formIsInvalid(this.form)) {
      return;
    }

    WaitingScreen.show();
    const updateValue = this.form.value;
    updateValue.cnpj = SharedUtils.normalizeDocument(updateValue.cnpj);

    this._requestService.post$(this.form.value, `${new EndpointUtils().ApiPharmacy.FINISH_CREATION}`)
      .pipe(finalize(() => WaitingScreen.hide()))
      .subscribe(() => ToastUtils.success('Informações atualizadas com sucesso'));
  }
}
