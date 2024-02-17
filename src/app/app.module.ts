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

import { Page1Component } from './page1/page1.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Page2Component } from './page2/page2.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DxChartModule, DxPieChartModule } from 'devextreme-angular';
import { HomeComponent } from './home/home.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProductsComponent } from './products/products.component';
import { AimsComponent } from './aims/aims.component';
import { SwiperModule } from 'swiper/angular';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    HomeComponent,
    ProductsComponent,
    AimsComponent,
    ContactUsComponent
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
    DxChartModule,
    DxPieChartModule,
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
    })  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
