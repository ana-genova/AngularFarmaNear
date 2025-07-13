import {Component} from '@angular/core';
import {NavigationComponent} from "../../navigation/navigation.component";
import {NgOptimizedImage} from "@angular/common";
import {NavigationService} from '../../../shared/service/navigation.service';
import {AppConfigService} from '../../../app.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    NavigationComponent,
    NgOptimizedImage,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  protected appTitle: string;

  constructor(appConfigService: AppConfigService,
              private _navigationService: NavigationService) {
    this.appTitle = appConfigService.appTitle;
  }

  toggleMobileMenu(): void {
    this._navigationService.toggle();
  }

}
