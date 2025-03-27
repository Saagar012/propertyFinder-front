import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HttpClientModule } from '@angular/common/http'; 

import { PagesModule } from "./pages/pages.module";
import { OrderByPipe } from './order-by.pipe';
import { CatalogModule } from './pages/catalog/catalog.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChatbotComponent } from './chatbot/chatbot.component'; // Import the ChatbotComponent
import { FormsModule } from '@angular/forms'; // Add this line


@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    CatalogModule,
    FormsModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    DropzoneModule,
    LeafletModule,
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
