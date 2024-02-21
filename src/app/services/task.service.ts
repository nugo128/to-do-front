import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${BASE_API_URL}/Task`);
  }
}
