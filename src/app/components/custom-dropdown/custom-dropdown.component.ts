import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.css',
})
export class CustomDropdownComponent implements OnChanges {
  @Input() options: string[] = [];
  @Input() submitted: boolean = false;
  @Input() reset: boolean = false;
  @Input() placeholderValue: string = '';
  @Output() optionSelected = new EventEmitter<string>();
  selectedOption: string = '';
  isDropdownOpen: boolean = false;
  hovered: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.submitted) {
      this.selectedOption = '';
      this.isDropdownOpen = false;
    }
    if (changes.placeholderValue) {
      if (this.placeholderValue === 'მიმდინარე') {
        this.selectedOption = 'მიმდინარე სტატუსი';
      } else if (this.placeholderValue === 'დასრულებული') {
        this.selectedOption = 'დასრულებული სტატუსი';
      }
    }
    if (changes.reset) {
      if (!this.reset) {
        this.isDropdownOpen = false;
        this.selectedOption = '';
      }
    }
  }
  if(submitted: boolean) {
    this.isDropdownOpen = false;
    this.selectedOption = '';
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
