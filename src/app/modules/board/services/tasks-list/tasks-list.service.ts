import { Task } from './../../models/task.model';
import { Observable, zip } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TasksList } from '../../models/tasks-list.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksListService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  getList(): Observable<TasksList[]> {
    return this.http.get<TasksList[]>(`${environment.baseUrl}/lists`)
    .pipe(map(tasksLists => tasksLists.map(taskList => new TasksList(taskList))));
  }

  addList(name: string, position: number): Observable<TasksList> {
    const payload = {
      id: uuidv4(),
      title: name,
      cardsIds: [],
      position
    };
    return this.http.post<TasksList>(`${environment.baseUrl}/lists`, payload);
  }

  deleteList(id: string): Observable<TasksList> {
    return this.http.delete<TasksList>(`${environment.baseUrl}/lists/` + id);
  }

  updateTasksPositions(tasksLists: TasksList[]): Observable<any> {
    return zip(...tasksLists.map(list => this.http.patch(`${environment.baseUrl}/lists/${list.id}`, {position: list.position})));
  }

  getSortedLists(tasksLists: TasksList[]): TasksList[] {
    return tasksLists.sort((a, b) => a.position - b.position);
  }

}
