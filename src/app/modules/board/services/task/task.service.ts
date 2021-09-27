import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()

export class TaskService {

  constructor(private http: HttpClient) { }

  private getBaseUrl(path: string): string {
    return `${environment.baseUrl}/${path}`
  }

  // getCards() {
  //   return this.http.get(this.getBaseUrl('lists/cards')).pipe(
  //     tap(console.log),
  //   );
  // }
}
