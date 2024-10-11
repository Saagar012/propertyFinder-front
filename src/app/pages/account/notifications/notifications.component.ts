import { Component, OnInit } from '@angular/core';

import { notification } from './notifications.model';
import { rentNotificationData, saleNotificationData } from './data';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

/**
 * Notifications Component
 */
export class NotificationsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  rentNotificationData!: notification[];
  saleNotificationData!: notification[];
  masterSelected!:boolean;
  checkedList:any;

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'#' },
      { label: 'Account', link:'#' },
      { label: 'Notifications', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.rentNotificationData = rentNotificationData;
    this.saleNotificationData = saleNotificationData;
  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.rentNotificationData.length; i++) {
      this.rentNotificationData[i].isSelected = this.masterSelected;
    }
    for (var i = 0; i < this.saleNotificationData.length; i++) {
      this.saleNotificationData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.rentNotificationData.length; i++) {
      if(this.rentNotificationData[i].isSelected)
      this.checkedList.push(this.rentNotificationData[i]);
    }
    for (var i = 0; i < this.saleNotificationData.length; i++) {
      if(this.saleNotificationData[i].isSelected)
      this.checkedList.push(this.saleNotificationData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

}
