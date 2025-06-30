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
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {AuthGuard} from './guards/guards.guard';

export const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard] },

  // Routes pour dossiers juridiques
  { path: 'dossiers', component: DossierListComponent, canActivate:[AuthGuard] },
  { path: 'dossiers/new', component: DossierFormComponent , canActivate:[AuthGuard]},
  //{ path: 'dossiers/:id', component: DossierDetailComponent, canActivate:[AuthGuard] },
  { path: 'dossiers/:id/edit', component: DossierFormComponent, canActivate:[AuthGuard] },

  // Routes pour mesures tribunal
  { path: 'mesures', component: MesureListComponent, canActivate:[AuthGuard] },
  { path: 'mesures/new', component: MesureFormComponent , canActivate:[AuthGuard]},
  { path: 'mesures/:id', component: MesureDetailComponent , canActivate:[AuthGuard]},
  { path: 'mesures/:id/edit', component: MesureFormComponent, canActivate:[AuthGuard] },

  // Routes pour documents
  { path: 'documents', component: DocumentListComponent , canActivate:[AuthGuard]},
  { path: 'documents/upload', component: DocumentUploadComponent , canActivate:[AuthGuard]},
  { path: 'documents/:id', component: DocumentDetailComponent , canActivate:[AuthGuard]},




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
