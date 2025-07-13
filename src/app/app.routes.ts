import {Routes} from '@angular/router';

import {RoutesUtils} from './shared/utils/routes.utils';

import {HomeComponent} from './components/home/home.component';
import {CredentialsComponent} from './components/credentials/credentials.component';
import {LoginComponent} from './components/credentials/login/login.component';
import {AccreditationComponent} from './components/credentials/accreditation/accreditation.component';
import {ChooseComponent} from './components/credentials/choose/choose.component';
import {PatientComponent} from './components/main/patient/patient.component';
import {PharmacyComponent} from './components/main/pharmacy/pharmacy.component';
import {LayoutComponent} from './components/main/layout/layout.component';
import {MenuItemsUtils} from './shared/utils/menu-items.utils';
import {PharmacyStorageComponent} from './components/main/pharmacy/pharmacy-storage/pharmacy-storage.component';
import {PharmacyProfileComponent} from './components/main/pharmacy/pharmacy-profile/pharmacy-profile.component';
import {PatientProfileComponent} from './components/main/patient/patient-profile/patient-profile.component';
import {FinderComponent} from './shared/components/finder/finder.component';
import {PatientHomeComponent} from './components/main/patient/patient-home/patient-home.component';

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
    path: RoutesUtils.PHARMACY,
    component: LayoutComponent,
    data: {
      menuItems: new MenuItemsUtils().pharmacy
    },
    children: [
      {
        path: RoutesUtils.PROFILE,
        component: PharmacyProfileComponent,
      },
      {
        path: RoutesUtils.STORAGE,
        component: PharmacyStorageComponent,
      },
    ]
  },
  {
    path: RoutesUtils.PATIENT,
    component: LayoutComponent,
    data: {
      menuItems: new MenuItemsUtils().patient
    },
    children: [
      {
        path: RoutesUtils.PROFILE,
        component: PatientProfileComponent,
      },
      {
        path: RoutesUtils.HOME,
        component: PatientHomeComponent,
      },
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
