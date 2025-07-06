import {Routes} from '@angular/router';

import {RoutesUtils} from './shared/utils/routes.utils';

import {HomeComponent} from './components/home/home.component';
import {CredentialsComponent} from './components/credentials/credentials.component';
import {LoginComponent} from './components/credentials/login/login.component';
import {AccreditationComponent} from './components/credentials/accreditation/accreditation.component';
import {ChooseComponent} from './components/credentials/choose/choose.component';

export const routes: Routes = [
  {
    path: RoutesUtils.HOME,
    component: HomeComponent
  },
  {
    path: RoutesUtils.LOGIN,
    component: CredentialsComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: RoutesUtils.LOGIN_CHOOSE,
        component: ChooseComponent,
      },
      {
        path: RoutesUtils.PATIENT,
        component: AccreditationComponent,
      },
      {
        path: RoutesUtils.PHARMACY,
        component: AccreditationComponent,
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutesUtils.HOME
  },
  {
    path: '**',
    redirectTo: RoutesUtils.HOME
  },
];
