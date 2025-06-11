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

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUB1c2VyLmNvbSIsImlhdCI6MTc0OTU4NDQyMiwiZXhwIjoxNzUwMTg5MjIyfQ.ispHZeXR3ELcray52Km_-NkHntz2VDDvpsDUQdS5fiQ'
  });

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
