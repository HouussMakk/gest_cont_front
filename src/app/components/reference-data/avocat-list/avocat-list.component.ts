import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvocatService } from '../../../services/avocat.service';
import { Avocat } from '../../../models/avocat.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-avocat-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './avocat-list.component.html',
  styleUrls: ['./avocat-list.component.scss']
})
export class AvocatListComponent implements OnInit {
  avocats: Avocat[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private avocatService: AvocatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAvocats();
  }

  loadAvocats(): void {
    this.loading = true;
    this.error = null;

    this.avocatService.getAllAvocats().subscribe({
      next: (data) => {
        this.avocats = data || [];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des avocats';
        this.loading = false;
        console.error(error);
      }
    });
  }

  deleteAvocat(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avocat?')) {
      this.avocatService.deleteAvocat(id).subscribe({
        next: () => {
          this.avocats = this.avocats.filter(a => a.idAvocat !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de l\'avocat');
        }
      });
    }
  }

  navigateToNew(): void {
    this.router.navigate(['/avocats/new']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/avocats/edit', id]);
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/avocats', id]);
  }
}
