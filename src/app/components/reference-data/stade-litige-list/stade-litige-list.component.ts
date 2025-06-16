import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StadeLitigeService } from '../../../services/stade-litige.service';
import { StadeLitige } from '../../../models/stade-litige.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stade-litige-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stade-litige-list.component.html',
  styleUrls: ['./stade-litige-list.component.scss']
})
export class StadeLitigeListComponent implements OnInit {
  stadesLitige: StadeLitige[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private stadeLitigeService: StadeLitigeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStadesLitige();
  }

  loadStadesLitige(): void {
    this.loading = true;
    this.error = null;

    this.stadeLitigeService.getAllStadesLitige().subscribe({
      next: (data) => {
        this.stadesLitige = data || [];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des stades litige';
        this.loading = false;
        console.error(error);
      }
    });
  }

  deleteStadeLitige(id: number | undefined): void {
    if (!id) {
      alert('Impossible de supprimer : ID manquant');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce stade litige?')) {
      this.stadeLitigeService.deleteStadeLitige(id).subscribe({
        next: () => {
          this.stadesLitige = this.stadesLitige.filter(s => s.idstadelitige !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du stade litige');
        }
      });
    }
  }

  navigateToNew(): void {
    this.router.navigate(['/stades-litige/new']);
  }

  navigateToEdit(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/stades-litige/edit', id]);
    } else {
      alert('Impossible d\'éditer : ID manquant');
    }
  }

  navigateToDetail(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/stades-litige', id]);
    } else {
      alert('Impossible d\'afficher les détails : ID manquant');
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
