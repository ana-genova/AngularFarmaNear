import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from '../footer/footer.component';
import {FinderComponent} from '../../shared/components/finder/finder.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    FooterComponent,
    FinderComponent
  ]
})
export class HomeComponent {
}
