import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-dropdown-button',
  imports: [
    NgClass
  ],
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.scss'
})
export class DropdownButtonComponent {

  @Input()
  placeholder: string = '';

  @Input()
  items: Array<DropdownItem> | undefined;

  @Input()
  value: string | number | undefined;

  @Output()
  onItemClick: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

  isOpen: boolean = false;

  constructor(private _eRef: ElementRef) {
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  itemClicked(option: DropdownItem): void {
    this.onItemClick.emit(option);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this._eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}

export interface DropdownItem {
  id?: number;
  type: string | number;
  description: string | number;
}
