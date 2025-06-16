import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartieAdverseService } from '../../../services/partie-adverse.service';
import { PartieAdverse } from '../../../models/partie-adverse.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-partie-adverse-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './partie-adverse-list.component.html',
  styleUrls: ['./partie-adverse-list.component.scss']
})
export class PartieAdverseListComponent implements OnInit {
  partiesAdverses: PartieAdverse[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private partieAdverseService: PartieAdverseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPartiesAdverses();
  }

  loadPartiesAdverses(): void {
    this.loading = true;
    this.error = null;

    this.partieAdverseService.getAllPartiesAdverses().subscribe({
      next: (data) => {
        this.partiesAdverses = data || [];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des parties adverses';
        this.loading = false;
        console.error(error);
      }
    });
  }

  deletePartieAdverse(id: number | undefined): void {
    if (!id) {
      alert('Impossible de supprimer : ID manquant');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer cette partie adverse?')) {
      this.partieAdverseService.deletePartieAdverse(id).subscribe({
        next: () => {
          this.partiesAdverses = this.partiesAdverses.filter(p => p.idPartieadverse !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de la partie adverse');
        }
      });
    }
  }

  navigateToNew(): void {
    this.router.navigate(['/parties-adverses/new']);
  }

  navigateToEdit(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/parties-adverses/edit', id]);
    } else {
      alert('Impossible d\'éditer : ID manquant');
    }
  }

  navigateToDetail(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/parties-adverses', id]);
    } else {
      alert('Impossible d\'afficher les détails : ID manquant');
    }
  }
}
