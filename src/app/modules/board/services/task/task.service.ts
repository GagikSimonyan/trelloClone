import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Injectable()

export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}/cards`)
    .pipe(
      map(response => response.map(task => new Task(task)))
    )
  }

  addTask(task: Task) {
    return this.http.post<Task>(`${environment.baseUrl}/cards`, task);
  }

  editTask(taskId: string, title: string) {
    return this.http.patch(`${environment.baseUrl}/cards/${taskId}`, {title});
  }
}
