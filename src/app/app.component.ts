import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { ITask } from './models/task';
import { EditingService } from './services/editting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'to-do-app-front';
  public tasks: any;
  public taskToEdit: number;
  public edittingMode: boolean = false;
  constructor(
    private taskService: TaskService,
    private editingService: EditingService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteTask(id: number) {
    const indexToDelete = this.tasks.findIndex((obj: ITask) => obj.id === id);

    if (indexToDelete !== -1) {
      this.tasks.splice(indexToDelete, 1);
    }
  }
  editTask(data: any) {
    const index = this.tasks.findIndex((obj: ITask) => obj.id === data.id);
    this.taskToEdit = this.tasks[index];
    this.edittingMode = data.edit;

    if (!this.edittingMode) {
      this.taskToEdit = null;
    }
  }
  editTaskData(data: ITask) {
    const index = this.tasks.findIndex((obj: ITask) => obj.id === data.id);
    this.tasks[index] = data;
    this.edittingMode = false;
    this.taskToEdit = null;
    this.editingService.setActiveTaskId(null);
  }
  handleResponse(response: ITask) {
    this.tasks.push(response);
  }
}
