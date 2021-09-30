import { Task } from './../../models/task.model';
import { Observable } from 'rxjs';
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
    return this.http.get<TasksList[]>(`${environment.baseUrl}/lists`).pipe(
      tap(console.log)
    );
  }

  addList(name: string, position: number): Observable<TasksList> {

    console.log('number ', position);
    const payload = {
      id: uuidv4(),
      title: name,
      cardsIds: [],
      position
    };

    return this.http.post(`${environment.baseUrl}/lists`, payload).pipe(
      tap(console.log)
    );
  }

  deleteList(id: string): Observable<TasksList> {
    return this.http.delete<TasksList>(`${environment.baseUrl}/lists/` + id)
  }

  // addCard(column: TasksList): Observable<Task> {
  //   return this.http.put(`${environment.baseUrl}/lists/${column.id}`, column)
  //   .pipe(
  //     map(() => column.cards[column.cards.length-1])
  //   );
  // }

}

