import { Component } from '@angular/core';
import {DataGridComponent} from '../../../../shared/components/grid/data-grid.component';

@Component({
  selector: 'app-pharmacy-storage',
  imports: [
    DataGridComponent
  ],
  templateUrl: './pharmacy-storage.component.html',
  styleUrl: './pharmacy-storage.component.scss'
})
export class PharmacyStorageComponent {

}
