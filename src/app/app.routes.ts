import {Routes} from '@angular/router';

import {RoutesUtils} from '../shared/utils/routes.utils';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {
    path: RoutesUtils.HOME,
    component: HomeComponent
  },
  {
    path: RoutesUtils.LOGIN,
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: RoutesUtils.HOME
  },
];
