import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from "../shared/shared.module";

// Light Box
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    LightboxModule
  ]
})
export class PagesModule { }
