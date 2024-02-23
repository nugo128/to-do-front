import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit, OnChanges {
  public dropdownOptions: string[] = [
    'მიმდინარე სტატუსი',
    'დასრულებული სტატუსი',
  ];
  public selectedOption: string = '';
  public submitted: boolean = false;
  public nameValid: boolean = true;
  public optionValid: boolean = true;
  public resetStatus: boolean = false;
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
    if (option === 'მიმდინარე სტატუსი') {
      this.selectedOption = 'მიმდინარე';
    } else if (option === 'დასრულებული სტატუსი') {
      this.selectedOption = 'დასრულებული';
    }
    this.form.value.status = this.selectedOption;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.edit) {
      if (this.edit === false) {
        this.resetStatus = false;
      } else {
        this.nameValid = true;
        this.optionValid = true;
        this.resetStatus = true;
      }
    }
  }
  onSubmit() {
    this.nameValid = this.form.value.name;
    this.submitted = false;
    if (!this.edit) {
      this.form.value.status = this.selectedOption;
      this.optionValid = this.form.value.status;
      if (this.form.value.name && this.form.value.status) {
        this.nameValid = true;
        this.optionValid = true;
        this.taskService.addTasks(this.form.value).subscribe(
          (response: ITask) => {
            this.responseReceived.emit(response);
            this.submitted = true;
            this.form.reset({
              id: 0,
            });
            this.selectedOption = null;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } else {
      if (!this.form.value.name) {
        this.form.value.name = this.taskToEdit.name;
      }
      if (!this.form.value.status) {
        this.form.value.status = this.taskToEdit.status;
      }
      this.form.value.id = this.taskToEdit.id;

      this.taskService
        .editTask(this.taskToEdit.id, this.form.value)
        .subscribe((response) => {
          this.nameValid = true;
          this.optionValid = true;
          this.editTask.emit(this.form.value);
          this.submitted = true;
          this.form.reset({
            id: 0,
          });
          this.selectedOption = null;
        });
    }
  }
}
