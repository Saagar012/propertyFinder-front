import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { PagesModule } from "./pages/pages.module";
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
