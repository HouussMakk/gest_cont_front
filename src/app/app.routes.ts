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
// Import Avocat components
import { AvocatListComponent } from './components/reference-data/avocat-list/avocat-list.component';
import { AvocatFormComponent } from './components/reference-data/avocat-form/avocat-form.component';

// Import Port components
import { PortListComponent } from './components/reference-data/port-list/port-list.component';
import { PortFormComponent } from './components/reference-data/port-form/port-form.component';

// Import Partie Adverse components
import { PartieAdverseListComponent } from './components/reference-data/partie-adverse-list/partie-adverse-list.component';
import { PartieAdverseFormComponent } from './components/reference-data/partie-adverse-form/partie-adverse-form.component';

// Import Stade Litige components
import { StadeLitigeListComponent } from './components/reference-data/stade-litige-list/stade-litige-list.component';
import { StadeLitigeFormComponent } from './components/reference-data/stade-litige-form/stade-litige-form.component';

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




  // Avocat routes
  { path: 'avocats', component: AvocatListComponent },
  { path: 'avocats/new', component: AvocatFormComponent },
  { path: 'avocats/edit/:id', component: AvocatFormComponent },

  // Port routes
  { path: 'ports', component: PortListComponent },
  { path: 'ports/new', component: PortFormComponent },
  { path: 'ports/edit/:code', component: PortFormComponent },

  // Partie Adverse routes
  { path: 'parties-adverses', component: PartieAdverseListComponent },
  { path: 'parties-adverses/new', component: PartieAdverseFormComponent },
  { path: 'parties-adverses/edit/:id', component: PartieAdverseFormComponent },

  // Stade Litige routes
  { path: 'stades-litige', component: StadeLitigeListComponent },
  { path: 'stades-litige/new', component: StadeLitigeFormComponent },
  { path: 'stades-litige/edit/:id', component: StadeLitigeFormComponent },

  // Redirection pour les routes non trouvées
  { path: '**', redirectTo: '/dashboard' }
];
