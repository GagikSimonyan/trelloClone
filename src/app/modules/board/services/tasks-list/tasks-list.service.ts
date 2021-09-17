import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  getList() {
    return this.http.get(`${environment.baseUrl}/lists`).pipe(
      tap(console.log)
    );
  }
}
