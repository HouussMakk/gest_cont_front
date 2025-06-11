import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MesureTribunal } from '../models/mesure-tribunal.model';

@Injectable({
  providedIn: 'root'
})
export class MesureTribunalService {
  private apiUrl = `${environment.apiUrl}/mesure`;

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUB1c2VyLmNvbSIsImlhdCI6MTc0OTU4NDQyMiwiZXhwIjoxNzUwMTg5MjIyfQ.ispHZeXR3ELcray52Km_-NkHntz2VDDvpsDUQdS5fiQ'
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getAllMesures(): Observable<MesureTribunal[]> {
    return this.http.get<MesureTribunal[]>(this.apiUrl, this.options);
  }

  getMesureById(id: number): Observable<MesureTribunal> {
    return this.http.get<MesureTribunal>(`${this.apiUrl}/${id}`, this.options);
  }

  createMesure(mesure: {
    typeMesure: any;
    dateMesure: Date;
    referenceDossier: any;
    documentAssocieId: null;
  }): Observable<MesureTribunal> {
    return this.http.post<MesureTribunal>(this.apiUrl, mesure, this.options);
  }

  updateMesure(id: number, mesure: {
    typeMesure: any;
    dateMesure: Date;
    referenceDossier: any;
    documentAssocieId: null;
  }): Observable<MesureTribunal> {
    return this.http.put<MesureTribunal>(`${this.apiUrl}/${id}`, mesure, this.options);
  }

  deleteMesure(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.options);
  }

  getMesuresByType(typeMesure: string): Observable<MesureTribunal[]> {
    return this.http.get<MesureTribunal[]>(`${this.apiUrl}/type/${typeMesure}`, this.options);
  }

  getMesuresByDossier(referenceDossier: string): Observable<MesureTribunal[]> {
    return this.http.get<MesureTribunal[]>(`${this.apiUrl}/dossier/${referenceDossier}`, this.options);
  }

  getMesuresByDate(date: string): Observable<MesureTribunal[]> {
    return this.http.get<MesureTribunal[]>(`${this.apiUrl}/date/${date}`, this.options);
  }
}
