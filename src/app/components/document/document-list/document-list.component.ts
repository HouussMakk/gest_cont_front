import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DossierJuridiqueService } from '../../../services/dossier-juridique.service';
import { MesureTribunalService } from '../../../services/mesure-tribunal.service';
import { DossierJuridique } from '../../../models/dossier-juridique.model';
import { MesureTribunal } from '../../../models/mesure-tribunal.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'], // ✅ Changé en .css
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class DocumentListComponent implements OnInit {
  dossiers: DossierJuridique[] = [];
  selectedReference = '';
  selectedDossier: DossierJuridique | null = null;
  mesures: MesureTribunal[] = [];
  loading = false;
  error: string | null = null;
  downloadLoading = false;

  constructor(
    private dossierService: DossierJuridiqueService,
    private mesureService: MesureTribunalService
  ) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  loadDossiers(): void {
    this.loading = true;
    this.dossierService.getAllDossiers().subscribe({
      next: (data) => {
        this.dossiers = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des dossiers';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDossierSelect(): void {
    if (!this.selectedReference) {
      this.selectedDossier = null;
      this.mesures = [];
      return;
    }

    this.selectedDossier = this.dossiers.find(d => d.referenceDossier === this.selectedReference) || null;

    if (this.selectedDossier) {
      this.loadMesuresForDossier(this.selectedReference);
    }
  }

  loadMesuresForDossier(reference: string): void {
    this.loading = true;
    this.mesureService.getMesuresByDossier(reference).subscribe({
      next: (data) => {
        this.mesures = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des mesures';
        this.loading = false;
        console.error(err);
      }
    });
  }

  downloadDossierWithMesures(): void {
    if (!this.selectedDossier) {
      alert('Veuillez sélectionner un dossier');
      return;
    }

    this.downloadLoading = true;
    const content = this.generateDocumentContent();
    this.downloadFile(content, `Dossier_${this.selectedDossier.referenceDossier}.txt`);
    this.downloadLoading = false;
  }

  downloadAsJSON(): void {
    if (!this.selectedDossier) {
      alert('Veuillez sélectionner un dossier');
      return;
    }

    const data = {
      dossier: this.selectedDossier,
      mesures: this.mesures,
      dateExport: new Date().toISOString(),
      nombreMesures: this.mesures.length
    };

    const content = JSON.stringify(data, null, 2);
    this.downloadFile(content, `Dossier_${this.selectedDossier.referenceDossier}.json`, 'application/json');
  }

  private generateDocumentContent(): string {
    let content = '';

    content += '='.repeat(60) + '\n';
    content += 'RAPPORT DE DOSSIER JURIDIQUE\n';
    content += '='.repeat(60) + '\n\n';

    content += 'INFORMATIONS DU DOSSIER\n';
    content += '-'.repeat(30) + '\n';
    content += `Référence: ${this.selectedDossier!.referenceDossier}\n`;
    content += `Qualité Agence: ${this.selectedDossier!.qualiteAgence}\n`;
    content += `Nature du Litige: ${this.selectedDossier!.natureLitige}\n`;
    content += `Objet du Litige: ${this.selectedDossier!.objetLitige}\n`;
    content += `Instance Judiciaire: ${this.selectedDossier!.instanceJudiciaire}\n`;
    if (this.selectedDossier!.codePort) {
      content += `Port: ${this.selectedDossier!.codePort}\n`;
    }
    content += `Date d'export: ${this.getCurrentDate()}\n\n`;

    content += 'MESURES TRIBUNAL ASSOCIÉES\n';
    content += '-'.repeat(30) + '\n';

    if (this.mesures.length === 0) {
      content += 'Aucune mesure tribunal associée à ce dossier.\n\n';
    } else {
      content += `Nombre total de mesures: ${this.mesures.length}\n\n`;

      this.mesures.forEach((mesure, index) => {
        content += `${index + 1}. ${mesure.typeMesure}\n`;
        content += `   Date: ${this.formatDate(mesure.dateMesure)}\n`;
        content += `   ID Mesure: ${mesure.idMesure}\n`;
        if (mesure.documentAssocieId) {
          content += `   Document associé: ${mesure.documentAssocieId}\n`;
        }
        content += '\n';
      });
    }

    content += '='.repeat(60) + '\n';
    content += 'Fin du rapport\n';
    content += `Généré le ${this.getCurrentDateTime()}\n`;
    content += '='.repeat(60) + '\n';

    return content;
  }

  private downloadFile(content: string, filename: string, mimeType = 'text/plain'): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  // ✅ Ajout de méthodes pour éviter l'erreur dans le template
  getCurrentDate(): string {
    return new Date().toLocaleDateString('fr-FR');
  }

  getCurrentDateTime(): string {
    return new Date().toLocaleString('fr-FR');
  }

  retry(): void {
    this.error = null;
    this.loadDossiers();
  }
}
