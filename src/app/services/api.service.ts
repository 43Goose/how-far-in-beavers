import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://beavers-api-production.up.railway.app';

  constructor(private http: HttpClient) { }

  getData(origin: string, destination: string, measurement: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/distance`, {params: {origin, destination, measurement}});
  }
}
