import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {DossierJuridique, DossierJuridiqueListing} from '../models/dossier-juridique.model';

@Injectable({
  providedIn: 'root'
})
export class DossierJuridiqueService {
  private apiUrl = `${environment.apiUrl}/dossiers`;
  headers = { 'Authorization': `Bearer ${window.localStorage.getItem("jwt")}` }

  constructor(private http: HttpClient) { }

  getAllDossiers(): Observable<DossierJuridiqueListing[]> {
    return this.http.get<DossierJuridiqueListing[]>(this.apiUrl,{headers:this.headers});
  }

  getDossierByReference(reference: string): Observable<DossierJuridique> {
    return this.http.get<DossierJuridique>(`${this.apiUrl}/${reference}`,{headers:this.headers});
  }

  createDossier(dossier: DossierJuridique): Observable<DossierJuridique> {
    return this.http.post<DossierJuridique>(this.apiUrl, dossier,{headers:this.headers});
  }

  updateDossier(reference: string, dossier: DossierJuridique): Observable<DossierJuridique> {
    return this.http.put<DossierJuridique>(`${this.apiUrl}/${reference}`, dossier,{headers:this.headers});
  }

  deleteDossier(reference: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reference}`,{headers:this.headers});
  }

  getDossiersByNatureLitige(natureLitige: string): Observable<DossierJuridique[]> {
    return this.http.get<DossierJuridique[]>(`${this.apiUrl}/nature/${natureLitige}`,{headers:this.headers});
  }

  getDossiersByInstanceJudiciaire(instanceJudiciaire: string): Observable<DossierJuridique[]> {
    return this.http.get<DossierJuridique[]>(`${this.apiUrl}/instance/${instanceJudiciaire}`,{headers:this.headers});
  }
}
