import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { AboutComponent } from "./about/about.component";
import { BlogGridComponent } from "./blog-grid/blog-grid.component";
import { SingleBlogComponent } from "./single-blog/single-blog.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { HelpCenterComponent } from "./help-center/help-center.component"

const routes: Routes = [
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "blog-grid",
    component: BlogGridComponent
  },
  {
    path: "single-blog",
    component: SingleBlogComponent
  },
  {
    path : "contacts",
    component: ContactsComponent
  },
  {
    path: "help-center",
    component: HelpCenterComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
