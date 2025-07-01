import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapMarker} from '@angular/google-maps';
import {SharedUtils} from '../../utils/shared.utils';
import {GoogleMapsService} from './google-maps.service';
import {DialogUtils} from '../../utils/dialog.utils';

@Component({
  standalone: true,
  selector: 'app-google-maps',
  imports: [
    GoogleMap,
    MapMarker
  ],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss'
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild(GoogleMap)
  map!: GoogleMap;

  @Input()
  height: number = 500;

  @Input()
  radius: number = 30;

  @Input()
  address: string = '';

  protected googleMaps: any;
  protected geocoder: any;
  center: google.maps.LatLngLiteral = {lat: -23.5975766, lng: -46.6779468};
  markerPositions: Array<any> = [];
  mapOptions: any = {};
  protected lastInfoWindow: any;
  protected isLoaded: boolean = false;

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

  private showPopupInfos(location: any): void {
    if (this.lastInfoWindow) {
      this.lastInfoWindow.close();
    }

    const conteudo = `
      <div><button id="info-btn" class="bg-primary cursor text-white p-1 mb-2 w-full">Ver</button></div>
      <div>
        <b>Título:</b> <br/>
        <b>Tipo:</b> <br/>
        <b>Descrição:</b> <br/>
        <b>Número:</b>
        <b>Ano:</b>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      headerDisabled: true,
      content: conteudo,
      position: location,
      pixelOffset: new google.maps.Size(0, -10),
    });

    this.lastInfoWindow = infoWindow;
    infoWindow.open(this.map.googleMap);
    infoWindow.addListener('closeclick', () => this.closeInfoWindow());
    setTimeout(() => {
      const button = document.getElementById('info-btn');
      if (button) {
        button.addEventListener('click', () => {
          // Implementar ação do botão
        });
      }
    }, 100);
  }

  protected closeInfoWindow(): void {
    if (this.lastInfoWindow) {
      this.lastInfoWindow.close();
      this.lastInfoWindow = undefined;
    }
  }

  private initMap(): void {
    this.mapOptions = {
      mapTypeId: google.maps.MapTypeId.HYBRID,
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

  private createMarcadoresProcessos() {
    if (!this.isLoaded) {
      return;
    }

    this.closeInfoWindow();

    if (!SharedUtils.isValidString(this.address)) {
      return;
    }

    this.geocoder.geocode({address: this.address}, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;

        const marker = new google.maps.Marker({
          position: location,
          map: this.map.googleMap,
        });

        marker.addListener('click', () => {
          this.showPopupInfos(location);
        });

        if (!this.markerPositions) {
          this.markerPositions = [];
        }
        this.markerPositions.push(location);
      } else {
        console.error('Geocode falhou:', status);
      }
    });
  }

  private getBounds() {
    const circle = new google.maps.Circle({
      center: this.center,
      radius: this.radius * 100
    });

    return circle.getBounds()!;
  }
}
