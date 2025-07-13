import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from '../../../shared/components/input-text/input-text.component';
import {NgOptimizedImage} from '@angular/common';
import {WaitingScreen} from '../../../shared/utils/waiting-screen.utils';
import {Router} from '@angular/router';
import {RoutesUtils} from '../../../shared/utils/routes.utils';

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

  constructor(private router: Router, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      login: new FormControl(),
      password: new FormControl()
    });
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }

  login(): void {
    // WaitingScreen.show();
    this.router.navigate([RoutesUtils.PHARMACY])
  }
}
