import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() name: string = '';
  @Input() status: string = '';
  @Input() id: number;
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter<any>();
  constructor(public taskService: TaskService) {}
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      (response) => {
        console.log(response);
        this.taskDeleted.emit(id);
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(id);
  }
}
