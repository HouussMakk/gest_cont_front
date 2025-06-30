// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TestConnectionComponent } from './components/test-connection/test-connection.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { DossierListComponent } from './components/dossier-juridique/dossier-list/dossier-list.component';
// import { DossierFormComponent } from './components/dossier-juridique/dossier-form/dossier-form.component';
// import { DossierDetailComponent } from './components/dossier-juridique/dossier-detail/dossier-detail.component';
// import { MesureListComponent } from './components/mesure-tribunal/mesure-list/mesure-list.component';
// import { MesureFormComponent } from './components/mesure-tribunal/mesure-form/mesure-form.component';
// import { MesureDetailComponent } from './components/mesure-tribunal/mesure-detail/mesure-detail.component';
// import { DocumentListComponent } from './components/document/document-list/document-list.component';
// import { DocumentUploadComponent } from './components/document/document-upload/document-upload.component';
// import { DocumentDetailComponent } from './components/document/document-detail/document-detail.component';
// import { AvocatListComponent } from './components/reference-data/avocat-list/avocat-list.component';
// import { PortListComponent } from './components/reference-data/port-list/port-list.component';
// import { StadeLitigeListComponent } from './components/reference-data/stade-litige-list/stade-litige-list.component';
// import { PartieAdverseListComponent } from './components/reference-data/partie-adverse-list/partie-adverse-list.component';
// import { LoginComponent } from './components/auth/login/login.component';
//
// const routes: Routes = [
//   // Public routes (no guard needed)
//   { path: 'login', component: LoginComponent },
//
//   // Protected routes (with AuthGuard)
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//
//   // Dossier Juridique routes
//   { path: 'dossiers', component: DossierListComponent, canActivate: [AuthGuard] },
//   { path: 'dossiers/new', component: DossierFormComponent, canActivate: [AuthGuard] },
//   { path: 'dossiers/:reference', component: DossierDetailComponent, canActivate: [AuthGuard] },
//   { path: 'dossiers/:reference/edit', component: DossierFormComponent, canActivate: [AuthGuard] },
//
//   // Mesure Tribunal routes
//   { path: 'mesures', component: MesureListComponent, canActivate: [AuthGuard] },
//   { path: 'mesures/new', component: MesureFormComponent, canActivate: [AuthGuard] },
//   { path: 'mesures/:id', component: MesureDetailComponent, canActivate: [AuthGuard] },
//   { path: 'mesures/:id/edit', component: MesureFormComponent, canActivate: [AuthGuard] },
//
//   // Document routes
//   { path: 'documents', component: DocumentListComponent, canActivate: [AuthGuard] },
//   { path: 'documents/upload', component: DocumentUploadComponent, canActivate: [AuthGuard] },
//   { path: 'documents/:id', component: DocumentDetailComponent, canActivate: [AuthGuard] },
//
//   // Reference data routes
//   { path: 'avocats', component: AvocatListComponent, canActivate: [AuthGuard] },
//   { path: 'parties-adverses', component: PartieAdverseListComponent, canActivate: [AuthGuard] },
//   { path: 'ports', component: PortListComponent, canActivate: [AuthGuard] },
//   { path: 'stades-litige', component: StadeLitigeListComponent, canActivate: [AuthGuard] },
//
//   // Test connection route
//   { path: 'test-connection', component: TestConnectionComponent, canActivate: [AuthGuard] },
//
//   // Wildcard route for 404
//   { path: '**', redirectTo: '/login' }
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
