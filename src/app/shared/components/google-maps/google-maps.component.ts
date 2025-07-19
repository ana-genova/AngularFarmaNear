import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GoogleMap, MapMarker} from '@angular/google-maps';
import {SharedUtils} from '../../utils/shared.utils';
import {GoogleMapsService} from './google-maps.service';
import {DialogUtils} from '../../utils/dialog.utils';
import {PharmacyNear} from '../../interface/pharmacy.interface';
import {environment} from '../../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-google-maps',
  imports: [
    GoogleMap,
  ],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss'
})
export class GoogleMapsComponent implements OnInit, OnChanges {

  @ViewChild(GoogleMap)
  map!: GoogleMap;

  @Input()
  height: number = 500;

  @Input()
  radius: number = 3;

  center: google.maps.LatLngLiteral = {lat: -23.5975766, lng: -46.6779468};
  protected mapOptions: any = {};

  protected googleMaps: any;

  protected isLoaded: boolean = false;
  private geocoder!: google.maps.Geocoder;

  constructor(private _googleMapsService: GoogleMapsService) {
  }

  async ngOnInit() {
    try {
      await this._googleMapsService.loadGoogleMapsScript();
      this.initializeGoogleMapsObjects();
      this.isLoaded = true;
      this.initGeolocation();
    } catch (error) {
      console.error('Erro ao carregar Google Maps:', error);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['radius'] && !changes['radius'].firstChange) {
      this.initMap();
    }
  }

  setMarkerPositions(response: PharmacyNear[]): void {
    response.forEach(pharmacy => {
      const markerElement = document.createElement('div');
      markerElement.innerHTML = `
        <div style="font-size: 18px">${pharmacy.name ?? ''}</div>
        <div class="mx-auto" style="background-color: #ff0000; border: 1px solid #132f4b; border-radius: 50%; width: 20px; height: 20px;"></div>
      `;

      new this.googleMaps.marker.AdvancedMarkerElement({
        map: this.map.googleMap,
        position: pharmacy.coordinates,
        title: pharmacy.name ?? '',
        content: markerElement,
      });
    });
  }

  centerByAddress(value: string): void {
    if (this.geocoder && value) {
      this.geocoder.geocode({address: value}, (results: any, status: any) => {
        if (status === 'OK' && results && results[0]) {
          this.center = results[0].geometry.location;
          this.initMap();
        } else {
          DialogUtils.error('Erro ao localizar endereço', 'Não foi possível encontrar o endereço informado.');
        }
      });
    }
  }

  private initializeGoogleMapsObjects(): void {
    this.googleMaps = google.maps;
    this.geocoder = new google.maps.Geocoder();
    this.initMap();
  }

  initGeolocation(showErrorMessage = false): void {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.center = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.initMap();
      },
      (error) => {
        if (!showErrorMessage) {
          return;
        }
        switch (error.code) {
          case error.PERMISSION_DENIED:
            DialogUtils.warning('Permissão negada', 'Para usar esse recurso ative a permissão de localização da página.');
            break;
          case error.POSITION_UNAVAILABLE:
            DialogUtils.error('Erro', 'Informação de localização não está disponível.');
            break;
          case error.TIMEOUT:
            DialogUtils.error('Erro', 'Tempo esgotado ao tentar obter a localização.');
            break;
          default:
            DialogUtils.error('Erro', 'Não foi possível obter a localização.');
        }
      }
    );
  }

  private initMap(): void {
    this.mapOptions = {
      mapId: environment.googleMapId,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      center: this.center,
      zoom: 15,
      minZoom: 11,
      maxZoom: 20,
      zoomControl: true,
      restriction: {
        latLngBounds: this.getBounds(),
        strictBounds: true
      }
    };
  }

  private getBounds() {
    const circle = new google.maps.Circle({
      center: this.center,
      radius: this.radius * 1000
    });

    return circle.getBounds()!;
  }
}
