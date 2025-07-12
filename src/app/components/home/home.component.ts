import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {InputTextComponent} from '../../shared/components/input-text/input-text.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DropdownButtonComponent, DropdownItem} from '../../shared/components/dropdown-button/dropdown-button.component';
import {GoogleMapsComponent} from '../../shared/components/google-maps/google-maps.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    HeaderComponent,
    InputTextComponent,
    ReactiveFormsModule,
    DropdownButtonComponent,
    GoogleMapsComponent,
    FooterComponent
  ]
})
export class HomeComponent {

  @ViewChild(GoogleMapsComponent)
  mapsComponent!: GoogleMapsComponent;

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
