import { Component, OnInit } from '@angular/core';

import { properties } from './properties.model';
import { propertiesData } from './data';

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

  constructor() { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Account', link:'/account/info' },
      { label: 'My Properties', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();
  }

   // Chat Data Fetch
   private _fetchData() {
    this.propertiesData = propertiesData;
  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }

}
