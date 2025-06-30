import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StadeLitige } from '../models/stade-litige.model';

@Injectable({
  providedIn: 'root'
})
export class StadeLitigeService {
  private apiUrl = `${environment.apiUrl}/stadeslitige`;

  headers = { 'Authorization': `Bearer ${window.localStorage.getItem("jwt")}` }

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getAllStadesLitige(): Observable<StadeLitige[]> {
    return this.http.get<StadeLitige[]>(this.apiUrl, this.options);
  }

  getStadeLitigeById(id: number): Observable<StadeLitige> {
    return this.http.get<StadeLitige>(`${this.apiUrl}/${id}`, this.options);
  }

  createStadeLitige(stadeLitige: StadeLitige): Observable<StadeLitige> {
    return this.http.post<StadeLitige>(this.apiUrl, stadeLitige, this.options);
  }

  updateStadeLitige(id: number, stadeLitige: StadeLitige): Observable<StadeLitige> {
    return this.http.put<StadeLitige>(`${this.apiUrl}/${id}`, stadeLitige, this.options);
  }

  deleteStadeLitige(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.options);
  }
}
