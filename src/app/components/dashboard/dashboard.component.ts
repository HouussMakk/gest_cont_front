import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DossierJuridiqueService } from '../../services/dossier-juridique.service';
import { MesureTribunalService } from '../../services/mesure-tribunal.service';
import { DocumentAssocieService } from '../../services/document-associe.service';
import { AvocatService } from '../../services/avocat.service';
import { PartieAdverseService } from '../../services/partie-adverse.service';
import { PortService } from '../../services/port.service';
import { StadeLitigeService } from '../../services/stade-litige.service';
import {DossierJuridique, DossierJuridiqueListing} from '../../models/dossier-juridique.model';
import { MesureTribunal } from '../../models/mesure-tribunal.model';
import { DocumentAssocie } from '../../models/document-associe.model';
import { Avocat } from '../../models/avocat.model';
import { PartieAdverse } from '../../models/partie-adverse.model';
import { Port } from '../../models/port.model';
import { StadeLitige } from '../../models/stade-litige.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  loading = true;
  error: string | null = null;

  // Données
  dossiers: DossierJuridiqueListing[] = [];
  mesures: MesureTribunal[] = [];
  documents: DocumentAssocie[] = [];
  avocats: Avocat[] = [];
  partiesAdverses: PartieAdverse[] = [];
  ports: Port[] = [];
  stadesLitige: StadeLitige[] = [];

  // Statistiques
  stats = {
    totalDossiers: 0,
    totalMesures: 0,
    totalDocuments: 0,
    totalAvocats: 0,
    totalPartiesAdverses: 0,
    totalPorts: 0,
    totalStadesLitige: 0,
    dossiersEnCours: 0,
    dossiersRecents: 0,
    mesuresRecentes: 0
  };

  // Données récentes pour affichage
  recentDossiers: DossierJuridiqueListing[] = [];
  recentMesures: MesureTribunal[] = [];
  recentDocuments: DocumentAssocie[] = [];

  constructor(
    private dossierService: DossierJuridiqueService,
    private mesureService: MesureTribunalService,
    private documentService: DocumentAssocieService,
    private avocatService: AvocatService,
    private partieAdverseService: PartieAdverseService,
    private portService: PortService,
    private stadeLitigeService: StadeLitigeService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      dossiers: this.dossierService.getAllDossiers(),
      mesures: this.mesureService.getAllMesures(),
      documents: this.documentService.getAllDocuments(),
      avocats: this.avocatService.getAllAvocats(),
      partiesAdverses: this.partieAdverseService.getAllPartiesAdverses(),
      ports: this.portService.getAllPorts(),
      stadesLitige: this.stadeLitigeService.getAllStadesLitige()
    }).subscribe({
      next: (data) => {
        this.dossiers = data.dossiers || [];
        this.mesures = data.mesures || [];
        this.documents = data.documents || [];
        this.avocats = data.avocats || [];
        this.partiesAdverses = data.partiesAdverses || [];
        this.ports = data.ports || [];
        this.stadesLitige = data.stadesLitige || [];

        this.calculateStats();
        this.getRecentData();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des données du dashboard';
        this.loading = false;
        console.error(err);
      }
    });
  }

  calculateStats(): void {
    this.stats.totalDossiers = this.dossiers.length;
    this.stats.totalMesures = this.mesures.length;
    this.stats.totalDocuments = this.documents.length;
    this.stats.totalAvocats = this.avocats.length;
    this.stats.totalPartiesAdverses = this.partiesAdverses.length;
    this.stats.totalPorts = this.ports.length;
    this.stats.totalStadesLitige = this.stadesLitige.length;

    // Calculs supplémentaires
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    this.stats.mesuresRecentes = this.mesures.filter(mesure =>
      new Date(mesure.dateMesure) >= thirtyDaysAgo
    ).length;

    this.stats.dossiersRecents = this.dossiers.length; // Ajustez selon vos critères
  }

  getRecentData(): void {
    // 5 dossiers les plus récents
    this.recentDossiers = this.dossiers.slice(0, 5);

    // 5 mesures les plus récentes
    this.recentMesures = this.mesures
      .sort((a, b) => new Date(b.dateMesure).getTime() - new Date(a.dateMesure).getTime())
      .slice(0, 5);

    // 5 documents les plus récents
    this.recentDocuments = this.documents
      .sort((a, b) => new Date(b.dateAjoute).getTime() - new Date(a.dateAjoute).getTime())
      .slice(0, 5);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  retry(): void {
    this.loadAllData();
  }
}
