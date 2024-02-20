import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.css',
})
export class CustomDropdownComponent {
  @Input() options: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();
  selectedOption: string = '';
  isDropdownOpen: boolean = false;
  hovered: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelect(option: string): void {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.optionSelected.emit(option);
  }
  optionHovered: boolean[] = new Array(this.options.length).fill(false);

  onHover(index: number, isHovered: boolean): void {
    this.optionHovered[index] = isHovered;
  }
}
