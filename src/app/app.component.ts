import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { ITask } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'to-do-app-front';
  public tasks: any;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        console.log(data);
        this.tasks = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteTask(id: number) {
    console.log(id, 'hehe');
    const indexToDelete = this.tasks.findIndex((obj: ITask) => obj.id === id);

    if (indexToDelete !== -1) {
      this.tasks.splice(indexToDelete, 1);
    }
  }
  handleResponse(response: ITask) {
    this.tasks.push(response);
  }
}
