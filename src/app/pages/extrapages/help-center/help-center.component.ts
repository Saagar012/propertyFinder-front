import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})

/**
 * HelpCenter Component
 */
export class HelpCenterComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Help center', active: true }
    ];
  }

  /**
   * Filter button clicked
   */
   FilterSidebar() {
    document.getElementById('help-sidebar')?.classList.toggle('show');
    document.querySelector('.vertical-overlay')?.classList.toggle('show');
   }

   /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    document.getElementById('help-sidebar')?.classList.remove('show');
    document.querySelector('.vertical-overlay')?.classList.remove('show');
  }

}
