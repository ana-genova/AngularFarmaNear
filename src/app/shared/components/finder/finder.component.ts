import {Component, Input, ViewChild} from '@angular/core';
import {DropdownButtonComponent, DropdownItem} from '../dropdown-button/dropdown-button.component';
import {GoogleMapsComponent} from '../google-maps/google-maps.component';
import {InputTextComponent} from '../input-text/input-text.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DialogUtils} from '../../utils/dialog.utils';
import {RequestService} from '../../service/request.service';
import {PharmacyNear} from '../../interface/pharmacy.interface';
import {EndpointUtils} from '../../utils/endpoint.utils';
import {debounce} from 'lodash';

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

  @ViewChild('medicineInput')
  medicineInput!: InputTextComponent;

  @ViewChild(GoogleMapsComponent)
  mapsComponent!: GoogleMapsComponent;

  @Input()
  height = 500;

  protected radiusItems: Array<DropdownItem> = [
    {type: 3, description: '3Km'},
    {type: 6, description: '6Km'},
    {type: 12, description: '12Km'}
  ];

  protected form: FormGroup;
  protected selectedRadius: number = 3;

  constructor(private _formBuilder: FormBuilder,
              private _requestService: RequestService) {
    this.form = this._formBuilder.group({
      medicine: new FormControl(),
      address: new FormControl()
    });

    this.form.get('address')?.valueChanges.subscribe(value => this.updateCenterAddress(value));
  }

  protected onSelectRadius(item: DropdownItem): void {
    this.selectedRadius = <number>item.type;
  }

  protected useLocation(): void {
    this.form.get('address')?.setValue('');
    this.mapsComponent.initGeolocation(true);
  }

  protected formControl(formControlName: string): FormControl<any> {
    return this.form.get(formControlName) ? this.form.get(formControlName) as FormControl : new FormControl();
  }

  protected onSubmit(): void {
    const value = this.form.value;
    if (!value.medicine) {
      DialogUtils
        .infoPromise('Qual o nome do medicamento?', 'Informe-nos o nome do medicamento que você está procurando.')
        .then(() => this.medicineInput?.focus());
      return;
    }

    if (!value.address && !this.mapsComponent.center) {
      DialogUtils
        .infoPromise('Informe o endereço', 'Isso nos ajudará a buscar o medicamento nas proximidades.')
        .then(() => this.medicineInput?.focus());
      return;
    }

    let url = new EndpointUtils().ApiFinder.LOCAL_MEDICINE;
    const requestBody: any = {
      medicine: value.medicine,
      radius: this.selectedRadius
    };

    if (value.address) {
      url += '/address';
      requestBody.address = value.address;
      this._requestService.post$(requestBody, url).subscribe((response: Array<PharmacyNear>) => this.loadMakers(response));
    } else {
      url += '/coordinates';
      requestBody.coordinates = this.mapsComponent.center;
      this._requestService.post$(requestBody, url).subscribe((response: Array<PharmacyNear>) => this.loadMakers(response));
    }
  }

  private loadMakers(response: PharmacyNear[]): void {
    if (response.length === 0) {
      DialogUtils.infoPromise('Nenhum resultado encontrado', 'Não encontramos farmácias próximas com o medicamento informado.');
      return;
    }

    this.mapsComponent.setMarkerPositions(response);
  }

  private updateCenterAddress = debounce((value: string) => {
    if (!value || this.mapsComponent) {
      this.mapsComponent.removeAllMarkers();
      this.mapsComponent.centerByAddress(value);
    }
  }, 1500);
}
