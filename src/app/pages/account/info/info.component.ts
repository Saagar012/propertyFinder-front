import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

/**
 * Info Component
 */
export class InfoComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public firstColleaps = true;

  constructor() { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Account', link: '/account/info' },
      { label: 'Personal Info', active: true }
    ];
  }

  /**
   * On mobile toggle button clicked
   */
  SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }

  dropconfig = {
    clickable: true,
    maxFiles: 5, // Set the maximum number of files to upload.
    addRemoveLinks: true,
  };
  uploadedFiles: File[] = [];

}
