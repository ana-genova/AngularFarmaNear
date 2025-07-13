import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MenuButton} from '../utils/menu-items.utils';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {

  private _toggle: EventEmitter<void> = new EventEmitter<void>();

  getMenuItens(menuItems: Array<MenuButton>, cssClass = 'hover:text-theme-600 text-gray-700 hover:bg-gray-200'): string {
    return menuItems.map(button => {
      return `
        <a class="block hover:cursor-pointer font-semibold px-3 py-2 m-0 ${cssClass}" href="${button.href}">
          ${button.titulo}
        </a>
      `;
    }).join(' ');
  }

  get observerToggle$(): Observable<void> {
    return this._toggle.asObservable();
  }

  toggle(): void {
    this._toggle.next();
  }
}
