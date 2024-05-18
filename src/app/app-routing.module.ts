import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AimsComponent } from './aims/aims.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SupportComponent } from './support/support.component';
import { DashboardComponent } from './products/dashboard/dashboard.component';
import { ConnectivityComponent } from './products/connectivity/connectivity.component';
import { AnalyticsComponent } from './products/analytics/analytics.component';
import { DigitalisationComponent } from './products/digitalisation/digitalisation.component';
import { HistoriansComponent } from './products/historians/historians.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'aims', component: AimsComponent },
  { path: 'contact-us', component: ContactUsComponent },

  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'support', component: SupportComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'connectivity', component: ConnectivityComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'historians', component: HistoriansComponent },
  { path: 'digitalisation', component: DigitalisationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
