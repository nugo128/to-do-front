import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditingService {
  private activeTaskIdSubject: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);
  activeTaskId: Observable<number | null> =
    this.activeTaskIdSubject.asObservable();

  setActiveTaskId(taskId: number | null): void {
    this.activeTaskIdSubject.next(taskId);
  }
}
