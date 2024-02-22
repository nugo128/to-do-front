import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';
import { Injectable } from '@angular/core';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${BASE_API_URL}/Task`);
  }
  addTasks(data: ITask) {
    return this.http.post(`${BASE_API_URL}/Task`, data);
  }
}
