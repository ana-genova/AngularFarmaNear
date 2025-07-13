import {Component, Input, ViewChild} from '@angular/core';
import {DropdownButtonComponent, DropdownItem} from '../dropdown-button/dropdown-button.component';
import {GoogleMapsComponent} from '../google-maps/google-maps.component';
import {InputTextComponent} from '../input-text/input-text.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss',
  imports: [
    DropdownButtonComponent,
    GoogleMapsComponent,
    InputTextComponent,
    ReactiveFormsModule
  ],
})
export class FinderComponent {

  @ViewChild(GoogleMapsComponent)
  mapsComponent!: GoogleMapsComponent;

  @Input()
  height = 500;

  protected radiusItems: Array<DropdownItem> = [
    {type: 30, description: '30'},
    {type: 60, description: '60'},
    {type: 120, description: 120}
  ];

  protected form: FormGroup;
  protected selectedRadius: number = 30;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      medicine: new FormControl(),
      address: new FormControl()
    });
  }

  protected onSelectRadius(item: DropdownItem): void {
    this.selectedRadius = <number>item.type;
  }

  protected useLocation(): void {
    this.mapsComponent.initGeolocation(true);
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }
}
