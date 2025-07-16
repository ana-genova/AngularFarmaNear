import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  getById$<T>(id: any, url: string, options?: any): Observable<T | any> {
    return this.http.get<T>(`${url}/${id}`, options);
  }

  get$<T>(url: string, options?: any): Observable<T | any> {
    return this.http.get<T>(url, options);
  }

  post$<T>(body: any, url: string, options?: any): Observable<T | any> {
    return this.http.post<T>(url, body, options);
  }

  put$<T>(body: any, url: string, options?: any): Observable<T | any> {
    return this.http.put<T>(url, body, options);
  }

  delete$(url: string, options?: any): Observable<any> {
    return this.http.request('delete', url, options);
  }

}
