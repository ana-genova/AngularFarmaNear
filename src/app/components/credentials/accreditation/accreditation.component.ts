import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {InputTextComponent} from '../../../shared/components/input-text/input-text.component';

import {DialogUtils} from '../../../shared/utils/dialog.utils';
import {RoutesUtils} from '../../../shared/utils/routes.utils';
import {ValidatorsUtils} from '../../../shared/utils/validators.utils';

import {UserType} from '../../../shared/enum/user-type.enum';
import {RequestService} from '../../../shared/service/request.service';
import {EndpointUtils} from '../../../shared/utils/endpoint.utils';
import {ToastUtils} from '../../../shared/utils/toast.utils';
import {SharedUtils} from '../../../shared/utils/shared.utils';
import {WaitingScreen} from '../../../shared/utils/waiting-screen.utils';
import {finalize, switchMap} from 'rxjs';

@Component({
  selector: 'app-accreditation',
  imports: [
    InputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './accreditation.component.html',
})
export class AccreditationComponent {

  protected form: FormGroup;
  protected userPlaceholder: string;
  protected documentPlaceholder: string;

  constructor(private _router: Router,
              private _formBuilder: FormBuilder,
              private _requestService: RequestService) {
    this.form = this._formBuilder.group({
      login: new FormControl(null, [ValidatorsUtils.required]),
      password: new FormControl(null, [ValidatorsUtils.passwordDynamic]),
      passwordConfirmation: new FormControl(null, [ValidatorsUtils.required]),
      role: new FormControl(null, [ValidatorsUtils.required]),
      name: new FormControl(null, [ValidatorsUtils.required]),
    });


    if (this._router.url.includes(RoutesUtils.PATIENT)) {
      this.form.get('role')?.setValue(UserType.PATIENT);
      this.userPlaceholder = 'Nome completo';
      this.documentPlaceholder = 'CPF';
      this.form.get('login')?.addValidators(ValidatorsUtils.cpf);
    } else {
      this.documentPlaceholder = 'CNPJ';
      this.userPlaceholder = 'Razão social';
      this.form.get('role')?.setValue(UserType.PHARMACY);
      this.form.get('login')?.addValidators(ValidatorsUtils.cnpj);
    }
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }

  protected submit(): void {
    if (ValidatorsUtils.formIsInvalid(this.form)) {
      return;
    }
    if (this.form.get('password')?.value !== this.form.get('passwordConfirmation')?.value) {
      DialogUtils.error('Senhas não conferem', 'As senhas informadas não conferem. Por favor, verifique e tente novamente.');
      this.form.get('password')?.setErrors({errorMessage: 'As senhas informadas não conferem.'});
      this.form.get('passwordConfirmation')?.setErrors({errorMessage: 'As senhas informadas não conferem.'});
      return;
    }

    WaitingScreen.show();
    const accreditation = this.form.value;
    accreditation.login = SharedUtils.normalizeDocument(accreditation.login);

    this._requestService.post$(accreditation, new EndpointUtils().ApiBase.USER_CREATE)
      .pipe(finalize(() => WaitingScreen.hide()))
      .subscribe({
        next: () => {
          ToastUtils.success('Cadastro realizado com sucesso');
          this._router.navigate([RoutesUtils.LOGIN]);
        },
        error: (error: any) => {
          DialogUtils.error('Atenção', `Um erro aconteceu: ${JSON.stringify(error.error)}`, true);
        }
      });
  }
}
