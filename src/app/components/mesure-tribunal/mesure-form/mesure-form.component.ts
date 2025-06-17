import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MesureTribunalService } from '../../../services/mesure-tribunal.service';
import { DossierJuridiqueService } from '../../../services/dossier-juridique.service';
import { MesureTribunal } from '../../../models/mesure-tribunal.model';
import {DossierJuridique, DossierJuridiqueListing} from '../../../models/dossier-juridique.model';

@Component({
  selector: 'app-mesure-form',
  templateUrl: './mesure-form.component.html',
  styleUrls: ['./mesure-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class MesureFormComponent implements OnInit {
  mesureForm: FormGroup;
  isEditMode = false;
  mesureId: number | null = null;
  loading = true;
  submitting = false;

  // Messages d'erreur et succès
  showSuccessMessage = false;
  fieldErrors: { [key: string]: string } = {};

  // Données de référence
  dossiers: DossierJuridiqueListing[] = [];

  // Types de mesures prédéfinis
  typesMesure = [
    'Saisie conservatoire',
    'Référé provision',
    'Expertise judiciaire',
    'Ordonnance de référé',
    'Jugement',
    'Arrêt de la Cour',
    'Ordonnance de mise en demeure',
    'Mesure d\'instruction',
    'Assignation en justice',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mesureService: MesureTribunalService,
    private dossierService: DossierJuridiqueService
  ) {
    this.mesureForm = this.fb.group({
      typeMesure: ['', Validators.required],
      dateMesure: ['', Validators.required],
      referenceDossier: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDossiers();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.mesureId = parseInt(id);
        this.loadMesure(this.mesureId);
      } else {
        this.setDefaultDate();
        this.loading = false;
      }
    });
  }

  loadDossiers(): void {
    this.dossierService.getAllDossiers().subscribe({
      next: (dossiers) => {
        this.dossiers = dossiers;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des dossiers:', err);
      }
    });
  }

  loadMesure(id: number): void {
    this.mesureService.getMesureById(id).subscribe({
      next: (mesure) => {
        const dateMesure = new Date(mesure.dateMesure);
        const formattedDate = dateMesure.toISOString().split('T')[0];

        this.mesureForm.patchValue({
          typeMesure: mesure.typeMesure,
          dateMesure: formattedDate,
          referenceDossier: mesure.referenceDossier
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la mesure:', err);
        this.router.navigate(['/mesures']);
        alert('Erreur lors du chargement de la mesure');
      }
    });
  }

  setDefaultDate(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    this.mesureForm.patchValue({
      dateMesure: formattedDate
    });
  }

  // Validation en temps réel
  onFieldBlur(fieldName: string): void {
    const control = this.mesureForm.get(fieldName);
    if (control && control.invalid && control.touched) {
      this.setFieldError(fieldName, this.getErrorMessage(fieldName, control.errors));
    } else {
      this.clearFieldError(fieldName);
    }
  }

  private setFieldError(fieldName: string, message: string): void {
    this.fieldErrors[fieldName] = message;
  }

  private clearFieldError(fieldName: string): void {
    delete this.fieldErrors[fieldName];
  }

  private getErrorMessage(fieldName: string, errors: any): string {
    if (errors['required']) {
      return `Le champ ${this.getFieldLabel(fieldName)} est obligatoire`;
    }
    return 'Ce champ contient une erreur';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'typeMesure': 'Type de mesure',
      'dateMesure': 'Date de la mesure',
      'referenceDossier': 'Dossier associé'
    };
    return labels[fieldName] || fieldName;
  }

  validateForm(): boolean {
    Object.keys(this.mesureForm.controls).forEach(key => {
      const control = this.mesureForm.get(key);
      if (control) {
        control.markAsTouched();
        if (control.invalid) {
          this.setFieldError(key, this.getErrorMessage(key, control.errors));
        }
      }
    });
    return this.mesureForm.valid;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.submitting = true;
    const mesureData = {
      typeMesure: this.mesureForm.value.typeMesure,
      dateMesure: new Date(this.mesureForm.value.dateMesure),
      referenceDossier: this.mesureForm.value.referenceDossier,
      documentAssocieId: null // Pas de document dans cette version simplifiée
    };

    const operation = this.isEditMode
      ? this.mesureService.updateMesure(this.mesureId!, mesureData)
      : this.mesureService.createMesure(mesureData);

    operation.subscribe({
      next: () => {
        this.submitting = false;
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.router.navigate(['/mesures']);
        }, 1500);
      },
      error: (err) => {
        console.error('Erreur lors de l\'opération:', err);
        this.submitting = false;
        alert(`Erreur lors de ${this.isEditMode ? 'la mise à jour' : 'la création'} de la mesure`);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/mesures']);
  }
}
