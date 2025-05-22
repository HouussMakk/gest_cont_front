import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DossierJuridiqueService } from '../../../services/dossier-juridique.service';
import { DossierJuridique } from '../../../models/dossier-juridique.model';

@Component({
  selector: 'app-dossier-detail',
  templateUrl: './dossier-detail.component.html',
  styleUrls: ['./dossier-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DossierDetailComponent implements OnInit {
  dossier: DossierJuridique | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dossierService: DossierJuridiqueService
  ) {}

  ngOnInit(): void {
    const reference = this.route.snapshot.paramMap.get('reference');
    if (reference) {
      this.loadDossier(reference);
    }
  }

  loadDossier(reference: string): void {
    this.dossierService.getDossierByReference(reference).subscribe({
      next: (dossier) => {
        this.dossier = dossier;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du dossier';
        this.loading = false;
        console.error(err);
      }
    });
  }

  editDossier(): void {
    if (this.dossier) {
      this.router.navigate(['/dossiers', this.dossier.referenceDossier, 'edit']);
    }
  }

  goBack(): void {
    this.router.navigate(['/dossiers']);
  }
}
