import {Component} from '@angular/core';
import {AppConfigService} from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  protected appTitle: string;

  constructor(appConfigService: AppConfigService) {
    this.appTitle = appConfigService.appTitle;
  }
}
