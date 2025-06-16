import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PartieAdverse } from '../models/partie-adverse.model';

@Injectable({
  providedIn: 'root'
})
export class PartieAdverseService {
  private apiUrl = `${environment.apiUrl}/partiesadverses`;

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUB1c2VyLmNvbSIsImlhdCI6MTc0OTU4NDQyMiwiZXhwIjoxNzUwMTg5MjIyfQ.ispHZeXR3ELcray52Km_-NkHntz2VDDvpsDUQdS5fiQ'
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getAllPartiesAdverses(): Observable<PartieAdverse[]> {
    return this.http.get<PartieAdverse[]>(this.apiUrl, this.options);
  }

  getPartieAdverseById(id: number): Observable<PartieAdverse> {
    return this.http.get<PartieAdverse>(`${this.apiUrl}/${id}`, this.options);
  }

  createPartieAdverse(partieAdverse: PartieAdverse): Observable<PartieAdverse> {
    return this.http.post<PartieAdverse>(this.apiUrl, partieAdverse, this.options);
  }

  updatePartieAdverse(id: number, partieAdverse: PartieAdverse): Observable<PartieAdverse> {
    return this.http.put<PartieAdverse>(`${this.apiUrl}/${id}`, partieAdverse, this.options);
  }

    deletePartieAdverse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.options);
  }
}
