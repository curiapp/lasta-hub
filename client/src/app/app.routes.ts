import { Routes } from '@angular/router';
import { StartNeedAnalysisComponent } from './components/forms/start-need-analysis/start-need-analysis.component';
import { LoadingPageComponent } from './components/loaders/loading-page/loading-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SenateConsultationsComponent } from './pages/programme/bos-apc-senate-consultations/consultations.component';
import { ExternalStakeholdersComponent } from './pages/programme/external-stakeholders/external-stakeholders.component';
import { InternalStakeholdersComponent } from './pages/programme/internal-stakeholders/internal-stakeholders.component';
import { NeedAnalysisComponent } from './pages/programme/need-analysis/need-analysis.component';
import { NqfRegistrationComponent } from './pages/programme/nqf-registration/nqf-registration.component';
import { ProgrammeDevelopmentComponent } from './pages/programme/programme-development/programme-development.component';
import { ProgrammeComponent } from './pages/programme/programme.component';
import { ResumeProgrammeComponent } from './pages/resume-programme/resume-programme.component';
import { TeamComponent } from './pages/team/team.component';
import { TutorialComponent } from './pages/tutorials/tutorials.component';
import { authGuard } from './guards/auth.guard';
import { programmeResolver } from './resolvers/programme.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'PDQA - Home' } },
  { path: 'login', component: LoginComponent, data: { title: 'PDQA - Login' } },
  { path: 'loading', component: LoadingPageComponent, data: { title: 'Loading' } },
  {
    path: '', component: MainComponent, data: { title: 'PDQA - Main' },
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'PDQA - Home' } },
      { path: 'home', component: HomeComponent, data: { title: 'PDQA - Home' } },
      { path: 'tutorials', component: TutorialComponent, data: { title: 'PDQA - Tutorials' } },
      { path: 'about-us', component: AboutUsComponent, data: { title: 'PDQA - About Us' } },
      { path: 'our-team', component: TeamComponent, data: { title: 'PDQA - Our Team' } },
      {
        path: 'programme/:id', component: ProgrammeComponent, canActivate: [authGuard], data: { title: 'PDQA - Programme' },
        resolve: { programme: programmeResolver },
        children: [
          { path: 'n-a', component: NeedAnalysisComponent, data: { title: 'PDQA - Need Analysis' } },
          { path: 'p-d', component: ProgrammeDevelopmentComponent, data: { title: 'PDQA - Programme development' } },
          { path: 'e-s', component: ExternalStakeholdersComponent, data: { title: 'PDQA - External stakeholders consultations' } },
          { path: 'i-s', component: InternalStakeholdersComponent, data: { title: 'PDQA - External stakeholders consultations' } },
          { path: 'b-a-s-c', component: SenateConsultationsComponent, data: { title: 'PDQA - BOS, APC and Senate Consultations' } },
          { path: 'n-r', component: NqfRegistrationComponent, data: { title: 'PDQA - NQF Registration' } },
          { path: '', redirectTo: 'n-a', pathMatch: 'full' },
        ]
      },
      { path: 'resume', component: ResumeProgrammeComponent, data: { title: 'PDQA - Resume' } },
      { path: 'StartNeedAnalysis', component: StartNeedAnalysisComponent, data: { title: 'PDQA - Need Analysis' } }
    ]
  },

];
