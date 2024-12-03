import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Component Pages
import { SingleV1Component } from "./single-v1/single-v1.component";
import { SaleComponent } from "./sale/sale.component";

const routes: Routes = [
  {
    path: "sale",
    component: SaleComponent
  },
  {
    path: "single-v1",
    component: SingleV1Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CatalogRoutingModule { }
