import {Component} from '@angular/core';

import {AppConfigService} from '../../app.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [],
})
export class FooterComponent {

  protected appTitle: string;
  protected currentYear: number;

  constructor(appConfigService: AppConfigService) {
    this.appTitle = appConfigService.appTitle;
    this.currentYear = new Date().getFullYear();
  }
}
