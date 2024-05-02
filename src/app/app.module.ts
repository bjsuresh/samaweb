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
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
