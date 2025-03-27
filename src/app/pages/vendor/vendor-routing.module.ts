import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AddPropertyComponent } from "./add-property/add-property.component";
import { PropertiesComponent } from "./properties/properties.component";
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: "add-property",
    component: AddPropertyComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "properties",
    component: PropertiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VendorRoutingModule { }
