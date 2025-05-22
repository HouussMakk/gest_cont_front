import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DossierListComponent } from './components/dossier-juridique/dossier-list/dossier-list.component';
import { DossierFormComponent } from './components/dossier-juridique/dossier-form/dossier-form.component';
//import { DossierDetailComponent } from './components/dossier-juridique/dossier-detail/dossier-detail.component';
import { MesureListComponent } from './components/mesure-tribunal/mesure-list/mesure-list.component';
import { MesureFormComponent } from './components/mesure-tribunal/mesure-form/mesure-form.component';
import { MesureDetailComponent } from './components/mesure-tribunal/mesure-detail/mesure-detail.component';
import { DocumentListComponent } from './components/document/document-list/document-list.component';
import { DocumentUploadComponent } from './components/document/document-upload/document-upload.component';
import { DocumentDetailComponent } from './components/document/document-detail/document-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // Routes pour dossiers juridiques
  { path: 'dossiers', component: DossierListComponent },
  { path: 'dossiers/new', component: DossierFormComponent },
  //{ path: 'dossiers/:id', component: DossierDetailComponent },
  { path: 'dossiers/:id/edit', component: DossierFormComponent },

  // Routes pour mesures tribunal
  { path: 'mesures', component: MesureListComponent },
  { path: 'mesures/new', component: MesureFormComponent },
  { path: 'mesures/:id', component: MesureDetailComponent },
  { path: 'mesures/:id/edit', component: MesureFormComponent },

  // Routes pour documents
  { path: 'documents', component: DocumentListComponent },
  { path: 'documents/upload', component: DocumentUploadComponent },
  { path: 'documents/:id', component: DocumentDetailComponent },

  // Redirection pour les routes non trouvées
  { path: '**', redirectTo: '/dashboard' }
];
