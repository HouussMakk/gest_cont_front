import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DossierJuridiqueService } from '../../../services/dossier-juridique.service';
import { DossierJuridique } from '../../../models/dossier-juridique.model';

@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class DossierListComponent implements OnInit {
  dossiers: DossierJuridique[] = [];
  filteredDossiers: DossierJuridique[] = [];
  loading = true;
  error: string | null = null;

  // Filtrage
  filterActive = false;
  filters = {
    reference: '',
    natureLitige: '',
    instanceJudiciaire: '',
    stadeLitige: ''
  };

  // Pagination
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  litige: any;

  constructor(private dossierService: DossierJuridiqueService) { }

  ngOnInit(): void {
    this.loadDossiers();
  }

  loadDossiers(): void {
    this.loading = true;
    this.dossierService.getAllDossiers().subscribe({
      next: (data) => {
        this.dossiers = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des dossiers. Veuillez réessayer.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    this.filteredDossiers = this.dossiers.filter(dossier => {
      return (!this.filters.reference || dossier.referenceDossier.includes(this.filters.reference)) &&
        (!this.filters.natureLitige || dossier.natureLitige === this.filters.natureLitige) &&
        (!this.filters.instanceJudiciaire || dossier.instanceJudiciaire === this.filters.instanceJudiciaire)
        //(!this.filters.stadeLitige || dossier.stadeLitige === this.filters.stadeLitige);
    });

    this.totalPages = Math.ceil(this.filteredDossiers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }

    // Appliquer la pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredDossiers = this.filteredDossiers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  openDeleteDialog(dossier: DossierJuridique): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le dossier ${dossier.referenceDossier} ?`)) {
      this.deleteDossier(dossier.referenceDossier);
    }
  }

  deleteDossier(reference: string): void {
    this.dossierService.deleteDossier(reference).subscribe({
      next: () => {
        this.dossiers = this.dossiers.filter(d => d.referenceDossier !== reference);
        this.applyFilters();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        alert('Erreur lors de la suppression du dossier');
      }
    });
  }
}
