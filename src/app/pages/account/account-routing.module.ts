import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { InfoComponent } from "./info/info.component";
import { SecurityComponent } from "./security/security.component";
import { PropertiesComponent } from "./properties/properties.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { NotificationsComponent } from "./notifications/notifications.component";

const routes: Routes = [
  {
    path: "info",
    component: InfoComponent
  },
  {
    path: "security",
    component: SecurityComponent
  },
  {
    path : "properties",
    component: PropertiesComponent
  },
  {
    path: "wishlist",
    component: WishlistComponent
  },
  {
    path: "reviews",
    component: ReviewsComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
