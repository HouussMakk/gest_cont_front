import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Port } from '../models/port.model';

@Injectable({
  providedIn: 'root'
})
export class PortService {
  private apiUrl = `${environment.apiUrl}/ports`;

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUB1c2VyLmNvbSIsImlhdCI6MTc0OTU4NDQyMiwiZXhwIjoxNzUwMTg5MjIyfQ.ispHZeXR3ELcray52Km_-NkHntz2VDDvpsDUQdS5fiQ'
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getAllPorts(): Observable<Port[]> {
    return this.http.get<Port[]>(this.apiUrl, this.options);
  }

  getPortByCode(code: string): Observable<Port> {
    return this.http.get<Port>(`${this.apiUrl}/${code}`, this.options);
  }

  createPort(port: Port): Observable<Port> {
    return this.http.post<Port>(this.apiUrl, port, this.options);
  }

  updatePort(code: string, port: Port): Observable<Port> {
    return this.http.put<Port>(`${this.apiUrl}/${code}`, port, this.options);
  }

  deletePort(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${code}`, this.options);
  }
}
