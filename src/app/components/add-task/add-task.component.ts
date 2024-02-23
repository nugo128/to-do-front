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
  public dropdownOptions: string[] = [
    'მიმდინარე სტატუსი',
    'დასრულებული სტატუსი',
  ];
  public selectedOption: string = '';
  public submitted: boolean = false;
  @Input() taskExists = '';
  @Input() edit: boolean = false;
  @Input() taskToEdit: any;
  form: FormGroup;
  @Output() responseReceived: EventEmitter<any> = new EventEmitter<any>();
  @Output() editTask: EventEmitter<any> = new EventEmitter<any>();
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(0),
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
    this.submitted = false;
    if (!this.edit) {
      this.form.value.status = this.selectedOption;
      console.log(this.form.value);
      if (this.form.value.name && this.form.value.status) {
        this.taskService.addTasks(this.form.value).subscribe(
          (response: ITask) => {
            this.responseReceived.emit(response);
            console.log(response);
            this.submitted = true;
            this.form.reset({
              id: 0,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } else {
      console.log(123123);
      if (!this.form.value.name) {
        this.form.value.name = this.taskToEdit.name;
      }
      if (!this.form.value.status) {
        this.form.value.status = this.taskToEdit.status;
      }
      this.form.value.id = this.taskToEdit.id;
      console.log(this.form.value);

      this.taskService
        .editTask(this.taskToEdit.id, this.form.value)
        .subscribe((response) => {
          console.log('success');
          this.editTask.emit(this.form.value);
          this.submitted = true;
          this.form.reset({
            id: 0,
          });
        });
    }
  }
}
