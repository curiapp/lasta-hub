import { Routes } from '@angular/router';
import { LoadingPageComponent } from './components/loaders/loading-page/loading-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './guards/auth.guard';
import { pdqaGuard } from './guards/pdqa.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'PDQA - Home' } },
  { path: 'login', component: LoginComponent, data: { title: 'PDQA - Login' } },
  { path: 'loading', component: LoadingPageComponent, data: { title: 'Loading' } },
  {
    path: '', component: MainComponent, data: { title: 'PDQA - Main' },
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'PDQA - Home' } },
      { path: 'home', component: HomeComponent, data: { title: 'PDQA - Home' } },
      { path: 'workflow-definition', loadComponent: () => import('./pages/workflow-definition/workflow-definition.component').then(m => m.WorkflowDefinitionComponent), canActivate: [pdqaGuard], data: { title: 'PDQA - Workflow Definition' } },
      { path: 'register-user', loadComponent: () => import('./pages/register-user/register-user.component').then(m => m.RegisterUserComponent), canActivate: [pdqaGuard], data: { title: 'PDQA - Register User' } },
      { path: 'reports-reviews', loadComponent: () => import('./pages/reports-reviews/reports-reviews.component').then(m => m.ReportsReviewsComponent), canActivate: [authGuard], data: { title: 'PDQA - Reports & Reviews' } },
      { path: 'tutorials', loadComponent: () => import('./pages/tutorials/tutorials.component').then(m => m.TutorialComponent), data: { title: 'PDQA - Tutorials' } },
      { path: 'about-us', loadComponent: () => import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent), data: { title: 'PDQA - About Us' } },
      { path: 'our-team', loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent), data: { title: 'PDQA - Our Team' } },
      {
        path: 'programme/:id', loadComponent: () => import('./pages/programme/programme.component').then(m => m.ProgrammeComponent), canActivate: [authGuard], data: { title: 'PDQA - Programme Process' }
      },
      { path: 'resume', loadComponent: () => import('./pages/resume-programme/resume-programme.component').then(m => m.ResumeProgrammeComponent), data: { title: 'PDQA - Resume' } },
      { path: 'create-programme', loadComponent: () => import('./components/forms/create-programme/create-programme.component').then(m => m.CreateProgrammeComponent), data: { title: 'PDQA - Create Programme' } }
    ]
  },

];
