import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbCarouselModule, NgbProgressbarModule, NgbRatingModule, NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Google Map
import { GoogleMapsModule } from '@angular/google-maps';

// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Component
import { VendorRoutingModule } from "./vendor-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyPromotionComponent } from './property-promotion/property-promotion.component';
import { PropertiesComponent } from './properties/properties.component';
import { ReviewsComponent } from './reviews/reviews.component';

import { SortByVendorPipe } from '../vendor/sort-by.pipe';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    AddPropertyComponent,
    PropertyPromotionComponent,
    PropertiesComponent,
    ReviewsComponent,
    SortByVendorPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbCarouselModule,
    VendorRoutingModule,
    NgbProgressbarModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SharedModule,
    GoogleMapsModule,
    DropzoneModule,
    SlickCarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class VendorModule { }
