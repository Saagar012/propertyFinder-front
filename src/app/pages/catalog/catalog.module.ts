import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbRatingModule, NgbTooltipModule, NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Youtube Player
import { YouTubePlayerModule } from '@angular/youtube-player';

// Ngx Sliders
import { NgxSliderModule } from 'ngx-slider-v2';

// Google Map
import { GoogleMapsModule } from '@angular/google-maps';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';


// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Component
import { CatalogRoutingModule } from "./catalog-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { RentComponent } from './rent/rent.component';
import { SingleV1Component } from './single-v1/single-v1.component';
import { SingleV2Component } from './single-v2/single-v2.component';
import { SaleComponent } from './sale/sale.component';
import { SortByPipe } from '../catalog/sort-by.pipe';

@NgModule({
  declarations: [
    RentComponent,
    SingleV1Component,
    SingleV2Component,
    SaleComponent,
    SortByPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgbPaginationModule,
    YouTubePlayerModule,
    NgxSliderModule,
    GoogleMapsModule,
    CatalogRoutingModule,
    SharedModule,
    SlickCarouselModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogModule { }
