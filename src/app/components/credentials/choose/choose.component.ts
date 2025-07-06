import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UserType} from '../../../shared/enum/user-type.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {RoutesUtils} from '../../../shared/utils/routes.utils';

@Component({
  selector: 'app-choose',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './choose.component.html',
})
export class ChooseComponent {

  userType = UserType;

  constructor(private router: Router) {
  }

  choose(userType: UserType): void {
    this.router.navigate([RoutesUtils.LOGIN, userType === this.userType.PATIENT ? RoutesUtils.PATIENT : RoutesUtils.PHARMACY]);
  }
}
