import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from '../../../shared/components/input-text/input-text.component';
import {Router} from '@angular/router';
import {RoutesUtils} from '../../../shared/utils/routes.utils';
import {UserType} from '../../../shared/enum/user-type.enum';
import {ValidatorsUtils} from '../../../shared/utils/validators.utils';
import {DialogUtils} from '../../../shared/utils/dialog.utils';

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

  constructor(private _formBuilder: FormBuilder,
              private _router: Router) {
    this.form = this._formBuilder.group({
      user: new FormControl(null, [ValidatorsUtils.required]),
      password: new FormControl(null, [ValidatorsUtils.passwordDynamic]),
      passwordConfirmation: new FormControl(null, [ValidatorsUtils.required]),
      type: new FormControl(null, [ValidatorsUtils.required]),
      name: new FormControl(null, [ValidatorsUtils.required]),
    });


    if (this._router.url.includes(RoutesUtils.PATIENT)) {
      this.form.get('type')?.setValue(UserType.PATIENT);
      this.userPlaceholder = 'Nome completo';
      this.documentPlaceholder = 'CPF';
      this.form.get('user')?.addValidators(ValidatorsUtils.cpf);
    } else {
      this.documentPlaceholder = 'CNPJ';
      this.userPlaceholder = 'Razão social';
      this.form.get('type')?.setValue(UserType.PHARMACY);
      this.form.get('user')?.addValidators(ValidatorsUtils.cnpj);
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
  }
}
