import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HttpClientModule } from '@angular/common/http'; 

import { PagesModule } from "./pages/pages.module";
import { OrderByPipe } from './order-by.pipe';
import { SingleV1Component } from './pages/catalog/single-v1/single-v1.component';
import { CatalogModule } from './pages/catalog/catalog.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    CatalogModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    DropzoneModule,
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
