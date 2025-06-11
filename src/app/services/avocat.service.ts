import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Avocat } from '../models/avocat.model';

@Injectable({
  providedIn: 'root'
})
export class AvocatService {
  private apiUrl = `${environment.apiUrl}/avocats`;
  headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUB1c2VyLmNvbSIsImlhdCI6MTc0OTU4NDQyMiwiZXhwIjoxNzUwMTg5MjIyfQ.ispHZeXR3ELcray52Km_-NkHntz2VDDvpsDUQdS5fiQ' }

  constructor(private http: HttpClient) { }

  getAllAvocats(): Observable<Avocat[]> {
    return this.http.get<Avocat[]>(this.apiUrl,{headers:this.headers});
  }

  getAvocatById(id: number): Observable<Avocat> {
    return this.http.get<Avocat>(`${this.apiUrl}/${id}`,{headers:this.headers});
  }

  createAvocat(avocat: Avocat): Observable<Avocat> {
    return this.http.post<Avocat>(this.apiUrl, avocat,{headers:this.headers});
  }

  updateAvocat(id: number, avocat: Avocat): Observable<Avocat> {
    return this.http.put<Avocat>(`${this.apiUrl}/${id}`, avocat,{headers:this.headers});
  }

  deleteAvocat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers:this.headers});
  }
}
