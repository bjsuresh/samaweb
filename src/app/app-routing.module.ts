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
import { ProductListComponent } from './product-list/product-list.component';
import { Products1Component } from './pages/products1/products1.component';
import { Products2Component } from './pages/products2/products2.component';
import { Products3Component } from './pages/products3/products3.component';
import { Products4Component } from './pages/products4/products4.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { Products5Component } from './pages/products5/products5.component';
import { CareersComponent } from './careers/careers.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'aims', component: AimsComponent },
  { path: 'contact-us', component: ContactUsComponent },

  { path: 'page1supra', component: Page1Component },
  // { path: 'page2', component: Page2Component },
  { path: 'support', component: SupportComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'connectivity', component: ConnectivityComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'digitalisation', component: DigitalisationComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'products1', component: Products1Component },
  { path: 'products2', component: Products2Component },
  { path: 'products3', component: Products3Component },
  { path: 'products4', component: Products4Component },
  { path: 'products5', component: Products5Component },
  { path: 'about-us', component: AboutusComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent }

];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    useHash: false,
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
