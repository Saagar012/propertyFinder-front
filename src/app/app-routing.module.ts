import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleV1Component } from './pages/catalog/single-v1/single-v1.component';

const routes: Routes = [
  {
    path: 'my-properties/:id',
    component: SingleV1Component,
    pathMatch: 'full'
  },
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  },

  // { path: 'catalog', loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule)  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
