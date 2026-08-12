import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Products2Component } from './pages/products2/products2.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CareersComponent } from './careers/careers.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HistorianComponent } from './pages/historian/historian.component';
import { AlarmComponent } from './pages/alarm/alarm.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { ConnectivitySuiteComponent } from './pages/connectivity/connectivity.component';
import { BatchComponent } from './pages/batch/batch.component';
import { SecurityComponent } from './pages/security/security.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },

  { path: 'product-list', component: ProductListComponent },
  // ── Product suite pages (grouped to match the mega-menu) ──
  { path: 'historian', component: HistorianComponent },
  { path: 'enterprise', component: Products2Component },
  { path: 'alarm', component: AlarmComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'connectivity-suite', component: ConnectivitySuiteComponent },
  { path: 'batch', component: BatchComponent },
  { path: 'security', component: SecurityComponent },

  // ── Legacy product routes → redirect to the new suite pages ──
  { path: 'products1', redirectTo: 'historian', pathMatch: 'full' },
  { path: 'products2', redirectTo: 'enterprise', pathMatch: 'full' },
  { path: 'products3', redirectTo: 'alarm', pathMatch: 'full' },
  { path: 'products4', redirectTo: 'documentation', pathMatch: 'full' },
  { path: 'products5', redirectTo: 'alarm', pathMatch: 'full' },
  { path: 'about-us', component: AboutusComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent }

];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    useHash: false,
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
