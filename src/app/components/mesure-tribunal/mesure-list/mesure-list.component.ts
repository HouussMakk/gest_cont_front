import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MesureTribunalService } from '../../../services/mesure-tribunal.service';
import { MesureTribunal } from '../../../models/mesure-tribunal.model';

@Component({
  selector: 'app-mesure-list',
  templateUrl: './mesure-list.component.html',
  styleUrls: ['./mesure-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class MesureListComponent implements OnInit {
  mesures: MesureTribunal[] = [];
  filteredMesures: MesureTribunal[] = [];
  loading = true;
  error: string | null = null;

  // Filtrage
  filterActive = false;
  filters = {
    referenceDossier: '',
    typeMesure: '',
    dateMesure: ''
  };

  // Pagination
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;

  constructor(private mesureService: MesureTribunalService) { }

  ngOnInit(): void {
    this.loadMesures();
  }

  loadMesures(): void {
    this.loading = true;
    this.error = null;

    this.mesureService.getAllMesures().subscribe({
      next: (data) => {
        this.mesures = data || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des mesures. Veuillez réessayer.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    this.filteredMesures = this.mesures.filter(mesure => {
      const matchDossier = !this.filters.referenceDossier ||
        mesure.referenceDossier.toLowerCase().includes(this.filters.referenceDossier.toLowerCase());

      const matchType = !this.filters.typeMesure ||
        mesure.typeMesure === this.filters.typeMesure;

      let matchDate = true;
      if (this.filters.dateMesure) {
        const filterDate = new Date(this.filters.dateMesure).toDateString();
        const mesureDate = new Date(mesure.dateMesure).toDateString();
        matchDate = mesureDate === filterDate;
      }

      return matchDossier && matchType && matchDate;
    });

    this.totalPages = Math.ceil(this.filteredMesures.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }

    // Appliquer la pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredMesures = this.filteredMesures.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  openDeleteDialog(mesure: MesureTribunal): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la mesure "${mesure.typeMesure}" ?`)) {
      this.deleteMesure(mesure.idMesure);
    }
  }

  deleteMesure(id: number): void {
    this.mesureService.deleteMesure(id).subscribe({
      next: () => {
        this.mesures = this.mesures.filter(m => m.idMesure !== id);
        this.applyFilters();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        alert('Erreur lors de la suppression de la mesure');
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
