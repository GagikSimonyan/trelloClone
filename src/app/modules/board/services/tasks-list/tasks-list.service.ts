import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../../models/task.model';
import { TasksList } from '../../models/tasks-list.model';

@Injectable()
export class TasksListService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  addList(name: string, position = 0): Observable<any> {
    const payload = {
      title: name,
      cards: [],
      position
    };

    return this.http.post(`${environment.baseUrl}/lists`, payload).pipe(
      tap(console.log)
    );
  }

  addCard(column: TasksList): Observable<Task> {
    return this.http.put(`${environment.baseUrl}/lists/${column.id}`, column)
    .pipe(
      map(() => column.cards[column.cards.length-1])
    );
  }

  getList() {
    return this.http.get(this.getBaseUrl('lists')).pipe(
      tap(console.log)
    );
  }

  private getBaseUrl(path: string): string {
      return `${environment.baseUrl}/${path}`
  }
}

