import { Component, OnInit } from '@angular/core';

import { properties } from './properties.model';
import { PropertyService } from 'src/app/core/services/property/property.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';

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
  username: string | null = null;
  email: string | null = null;
  dataCount: any;
  currentPage: any;
  totalPages: any;
  pageNumbers:any;
  constructor(private propertyService: PropertyService,private authService: AuthService, private staticDataService: StaticDataService) { }
  limit: number = 4;

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
    this._fetchData(1, this.staticDataService.PROPERTY_STATUS.ALL_STATUS);
    this.fetchUserData();
  }

  // Chat Data Fetch
  public _fetchData(page:number = 1, status: string) {
     (this.propertyService.fetchProperties(page, this.limit, status).subscribe(response =>{
      if (response && response.data) { // Check if response has data property
        this.propertiesData = response.data.map((item: any) => this.transformProperty(item));
        this.dataCount = response.pagination.pageSize;
        this.currentPage = response.pagination.currentPage;
        this.totalPages = response.pagination.totalPages;
      // Generate the page numbers for navigation
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
        console.error("No data found in response");
      }
    }));

  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this._fetchData(page,this.staticDataService.PROPERTY_STATUS.ALL_STATUS ); // Refetch data for the selected page
    }
  }
  private fetchUserData(){
    if(localStorage.getItem('user')){
      this.username = localStorage.getItem('user');
    }
    if(localStorage.getItem('email')){
      this.email = localStorage.getItem('email');
    }

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
      btn: item.status,
      btn_color: item.status === this.staticDataService.PROPERTY_STATUS.VERIFIED ? 'success' : 'info',
      category: item.category,
      streetAddress: item.streetAddress,
      totalPrice: item.totalPrice ? `$${item.totalPrice}` : 'N/A',
      bedrooms: item.bedrooms ? `${item.bedrooms} Bed` : 'N/A',
      bathrooms: item.bathrooms ? `${item.bathrooms} Bath` : 'N/A',
      parkingSpots: item.parkingSpots ? `${item.parkingSpots} Parking` : 'N/A',
      image : item.images ? item.images[0] : '',

    };

  }
}


