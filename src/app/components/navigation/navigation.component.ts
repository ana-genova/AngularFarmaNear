import {Component, OnInit} from '@angular/core';

import {NavigationService} from '../../shared/service/navigation.service';
import {ScreenService} from '../../shared/service/screen.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [],
})
export class NavigationComponent implements OnInit {

  protected menuButtons: string | undefined;
  protected menuOpen: boolean = false;

  constructor(private _navigationService: NavigationService,
              private _screenService: ScreenService,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.menuOpen = !this._screenService.isSmallScreen;
    this._screenService.changed.subscribe(() => this.menuOpen = !this._screenService.isSmallScreen);
    this._navigationService.observerToggle$.subscribe(() => this.toggleMenu());

    const menuItems = this._activatedRoute.snapshot?.data['menuItems'] ?? [];
    this.menuButtons = this._navigationService.getMenuItens(menuItems);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
