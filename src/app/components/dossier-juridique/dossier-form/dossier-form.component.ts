import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DossierJuridiqueService } from '../../../services/dossier-juridique.service';
import { AvocatService } from '../../../services/avocat.service';
import { PartieAdverseService } from '../../../services/partie-adverse.service';
import { PortService } from '../../../services/port.service';
import { StadeLitigeService } from '../../../services/stade-litige.service';
import { Avocat } from '../../../models/avocat.model';
import { PartieAdverse } from '../../../models/partie-adverse.model';
import { Port } from '../../../models/port.model';
import { StadeLitige } from '../../../models/stade-litige.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dossier-form',
  templateUrl: './dossier-form.component.html',
  styleUrls: ['./dossier-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class DossierFormComponent implements OnInit {
  dossierForm: FormGroup;
  isEditMode = false;
  dossierReference: string | null = null;
  loading = true;
  submitting = false;

  // Données de référence
  avocats: Avocat[] = [];
  partiesAdverses: PartieAdverse[] = [];
  ports: Port[] = [];
  stadesLitige: StadeLitige[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dossierService: DossierJuridiqueService,
    private avocatService: AvocatService,
    private partieAdverseService: PartieAdverseService,
    private portService: PortService,
    private stadeLitigeService: StadeLitigeService
  ) {
    this.dossierForm = this.fb.group({
      referenceDossier: ['', Validators.required],
      qualiteAgence: ['', Validators.required],
      natureLitige: ['', Validators.required],
      objetLitige: ['', Validators.required],
      instanceJudiciaire: ['', Validators.required],
      codePort: [''],
      partieAdverseId: [null],
      stadeLitigeId: [null],
      avocatId: [null]
    });
  }

  ngOnInit(): void {
    this.loadReferenceData();

    this.route.paramMap.subscribe(params => {
      const reference = params.get('id');
      if (reference) {
        this.isEditMode = true;
        this.dossierReference = reference;
        this.loadDossier(reference);
      } else {
        this.generateReference();
        this.loading = false;
      }
    });
  }

  loadReferenceData(): void {
    forkJoin({
      avocats: this.avocatService.getAllAvocats(),
      partiesAdverses: this.partieAdverseService.getAllPartiesAdverses(),
      ports: this.portService.getAllPorts(),
      stadesLitige: this.stadeLitigeService.getAllStadesLitige()
    }).subscribe({
      next: (data) => {
        this.avocats = data.avocats;
        this.partiesAdverses = data.partiesAdverses;
        this.ports = data.ports;
        this.stadesLitige = data.stadesLitige;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données de référence:', err);
      }
    });
  }

  loadDossier(reference: string): void {
    this.dossierService.getDossierByReference(reference).subscribe({
      next: (dossier) => {
        this.dossierForm.patchValue(dossier);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du dossier:', err);
        this.router.navigate(['/dossiers']);
        alert('Erreur lors du chargement du dossier');
      }
    });
  }

  generateReference(): void {
    const today = new Date();
    const refPrefix = `REF-${today.getFullYear()}-`;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.dossierForm.patchValue({
      referenceDossier: `${refPrefix}${randomNum}`
    });
  }

  isInvalid(fieldName: string): boolean {
    const field = this.dossierForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  onSubmit(): void {
    if (this.dossierForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.dossierForm.controls).forEach(key => {
        this.dossierForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const dossierData = this.dossierForm.value;

    if (this.isEditMode && this.dossierReference) {
      this.dossierService.updateDossier(this.dossierReference, dossierData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/dossiers']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
          this.submitting = false;
          alert('Erreur lors de la mise à jour du dossier');
        }
      });
    } else {
      this.dossierService.createDossier(dossierData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/dossiers']);
        },
        error: (err) => {
          console.error('Erreur lors de la création:', err);
          this.submitting = false;
          alert('Erreur lors de la création du dossier');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dossiers']);
  }
}
