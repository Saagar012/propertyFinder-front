import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbDropdownModule,
    ScrollToModule
  ],
  exports: [HeaderComponent, FooterComponent, BreadcrumbsComponent]
})
export class SharedModule { }
