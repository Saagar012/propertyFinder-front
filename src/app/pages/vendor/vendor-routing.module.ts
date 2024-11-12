import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AddPropertyComponent } from "./add-property/add-property.component";
import { PropertyPromotionComponent } from "./property-promotion/property-promotion.component";
import { PropertiesComponent } from "./properties/properties.component";
import { ReviewsComponent } from "./reviews/reviews.component";

const routes: Routes = [
  {
    path: "add-property",
    component: AddPropertyComponent
  },
  {
    path: "property-promotion",
    component: PropertyPromotionComponent
  },
  {
    path: "properties",
    component: PropertiesComponent
  },
  {
    path: "reviews",
    component: ReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VendorRoutingModule { }
