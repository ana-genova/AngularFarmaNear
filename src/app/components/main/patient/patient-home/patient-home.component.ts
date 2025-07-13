import { Component } from '@angular/core';
import {FinderComponent} from '../../../../shared/components/finder/finder.component';

@Component({
  selector: 'app-patient-home',
  imports: [
    FinderComponent
  ],
  templateUrl: './patient-home.component.html',
  styleUrl: './patient-home.component.scss'
})
export class PatientHomeComponent {

}
