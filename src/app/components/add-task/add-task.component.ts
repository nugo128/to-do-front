import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  dropdownOptions: string[] = ['მიმდინარე სტატუსი', 'დასრულებული სტატუსი'];
  selectedOption: string = '';

  onOptionSelected(option: string): void {
    this.selectedOption =
      option === 'მიმდინარე სტატუსი' ? 'მიმდინარე' : 'დასრულებული';
    console.log(this.selectedOption);
  }
  @Input() taskExists = '';
}
