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

  headers = { 'Authorization': `Bearer ${window.localStorage.getItem("jwt")}` }


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
