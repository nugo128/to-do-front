import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  dropdownOptions: string[] = ['მიმდინარე სტატუსი', 'დასრულებული სტატუსი'];
  selectedOption: string = '';

  onOptionSelected(option: string): void {
    this.selectedOption = option;
    console.log(this.selectedOption);
  }
}
