import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  dropdownOptions: string[] = ['მიმდინარე სტატუსი', 'დასრულებული სტატუსი'];
  selectedOption: string = '';
  @Input() taskExists = '';
  form: FormGroup;
  @Output() responseReceived: EventEmitter<any> = new EventEmitter<any>();
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      status: new FormControl(this.selectedOption),
    });
  }
  onOptionSelected(option: string): void {
    this.selectedOption =
      option === 'მიმდინარე სტატუსი' ? 'მიმდინარე' : 'დასრულებული';
    console.log(this.selectedOption);
    this.form.value.status = this.selectedOption;
  }
  onSubmit() {
    this.form.value.status = this.selectedOption;
    console.log(this.form.value);
    if (this.form.value.name && this.form.value.status) {
      this.taskService
        .addTasks(this.form.value)
        .subscribe((response: ITask) => {
          this.responseReceived.emit(response);
          console.log(response);
        });
    }
  }
}
