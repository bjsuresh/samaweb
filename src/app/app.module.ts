import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DxChartModule, DxDataGridModule, DxPieChartModule } from 'devextreme-angular';
import { HomeComponent } from './home/home.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProductsComponent } from './products/products.component';
import { AimsComponent } from './aims/aims.component';
import { SwiperModule } from 'swiper/angular';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './support/support.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxCaptchaModule } from '@binssoft/ngx-captcha';
import {MatSelectModule} from '@angular/material/select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CustomCursorDirective } from './custom-cursor.directive';
import { DashboardComponent } from './products/dashboard/dashboard.component';
import { ConnectivityComponent } from './products/connectivity/connectivity.component';
import { AnalyticsComponent } from './products/analytics/analytics.component';
import { HistoriansComponent } from './products/historians/historians.component';
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

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    HomeComponent,
    ProductsComponent,
    AimsComponent,
    ContactUsComponent,
    SupportComponent,
    CustomCursorDirective,
    DashboardComponent,
    ConnectivityComponent,
    AnalyticsComponent,
    HistoriansComponent,
    DigitalisationComponent,
    ProductListComponent,
    Products1Component,
    Products2Component,
    Products3Component,
    Products4Component,
    AboutusComponent,
    Products5Component,
    CareersComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DxChartModule,
    DxPieChartModule,
    DxDataGridModule,
    SwiperModule,
    ReactiveFormsModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 1,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    NgxCaptchaModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
