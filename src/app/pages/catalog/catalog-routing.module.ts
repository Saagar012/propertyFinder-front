import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { RentComponent } from "./rent/rent.component";
import { SingleV1Component } from "./single-v1/single-v1.component";
import { SingleV2Component } from "./single-v2/single-v2.component";
import { SaleComponent } from "./sale/sale.component";

const routes: Routes = [
  {
    path: "rent",
    component: RentComponent
  },
  {
    path: "sale",
    component: SaleComponent
  },
  {
    path: "single-v1",
    component: SingleV1Component
  },
  {
    path:"single-v2",
    component: SingleV2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CatalogRoutingModule { }
