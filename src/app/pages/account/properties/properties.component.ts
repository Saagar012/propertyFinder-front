import { Component, OnInit } from '@angular/core';

import { properties } from './properties.model';
import { propertiesData } from './data';
import { PropertyService } from 'src/app/core/services/property/property.service';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})

/**
 * Properties Component
 */
export class PropertiesComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  propertiesData!: properties[];

  constructor(private propertyService: PropertyService,private authService: AuthService) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Account', link: '/account/info' },
      { label: 'My Properties', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    //  this.propertiesData = propertiesData;
     (this.propertyService.fetchProperties().subscribe(response =>{
      if (response && response.data) { // Check if response has data property
        this.propertiesData = response.data.map((item: any) => this.transformProperty(item));
        console.log("Transformed properties data:", this.propertiesData); // Log the transformed data
      } else {
        console.error("No data found in response");
      }
    }));

  }
  logout() {
    this.authService.logout();
  }
  /**
   * On mobile toggle button clicked
   */
  SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }
  private transformProperty(item: any): properties {
    return {
      id:item.id,
      propertyImage: item.propertyImage?.[0] || '',
      btn: item.status === 'AVAILABLE' ? 'Available' : 'Not Available',
      btn_color: item.status === 'AVAILABLE' ? 'green' : 'red',
      category: item.category,
      streetAddress: item.streetAddress,
      priceAmountPerAnnum: item.priceAmountPerAnnum ? `$${item.priceAmountPerAnnum} per annum` : 'N/A',
      bedrooms: item.bedrooms ? `${item.bedrooms} Bed` : 'N/A',
      bathrooms: item.bathrooms ? `${item.bathrooms} Bath` : 'N/A',
      parkingSpots: item.parkingSpots ? `${item.parkingSpots} Parking` : 'N/A',
      image : item.images ? item.images[0] : '',

    };

  }
}


