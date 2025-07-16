import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from '../../../shared/components/input-text/input-text.component';
import {NgOptimizedImage} from '@angular/common';
import {WaitingScreen} from '../../../shared/utils/waiting-screen.utils';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';
import {AuthService} from '../../../shared/service/auth.service';
import {PayloadService} from '../../../shared/service/payload.service';
import {UserType} from '../../../shared/enum/user-type.enum';
import {RoutesUtils} from '../../../shared/utils/routes.utils';
import {ValidatorsUtils} from '../../../shared/utils/validators.utils';
import {SharedUtils} from '../../../shared/utils/shared.utils';

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

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _payloadService: PayloadService) {
    this.form = this._formBuilder.group({
      login: new FormControl(),
      password: new FormControl()
    });
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }

  login(): void {
    if (ValidatorsUtils.formIsInvalid(this.form)) {
      return;
    }

    WaitingScreen.show();
    const accreditation = this.form.value;
    accreditation.login = SharedUtils.normalizeDocument(accreditation.login);

    this._authService.authenticate$(this.form.value)
      .pipe(finalize(() => WaitingScreen.hide()))
      .subscribe(() => {
        this.router.navigate([this._payloadService.userType === UserType.PHARMACY ? RoutesUtils.PHARMACY : RoutesUtils.PATIENT]);
      });
  }
}
