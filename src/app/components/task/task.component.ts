import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { EditingService } from '../../services/editting.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() name: string = '';
  @Input() status: string = '';
  @Input() id: number;
  @Output() taskDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskEditted: EventEmitter<any> = new EventEmitter<any>();

  edittingMode: boolean = false;

  constructor(
    public taskService: TaskService,
    private editingService: EditingService
  ) {}

  ngOnInit(): void {
    this.editingService.activeTaskId.subscribe((activeTaskId) => {
      this.edittingMode = activeTaskId === this.id;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.taskDeleted.emit(id);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editTask(id: number): void {
    this.editingService.setActiveTaskId(this.edittingMode ? null : id);
    this.taskEditted.emit({ id, edit: this.edittingMode });
    console.log(id);
  }
}
