import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {registerLocaleData} from '@angular/common';

import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
