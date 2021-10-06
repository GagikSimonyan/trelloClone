import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable, zip } from 'rxjs';

@Injectable()

export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}/cards`)
    .pipe(
      map(response => this.getSortedTasks(response.map(task => new Task(task))))
    )
  }

  addTask(task: Task) {
    return this.http.post<Task>(`${environment.baseUrl}/cards`, task);
  }

  editTask(taskId: string, title: string) {
    return this.http.patch(`${environment.baseUrl}/cards/${taskId}`, {title});
  }

  updateTasksPositions(tasks: Task[]): Observable<unknown> {
    return zip(...tasks.map(task => this.http.patch(`${environment.baseUrl}/cards/${task.id}`, {position: task.position, listId: task.listId})));;
  }

  getSortedTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.position - b.position);
  }
}