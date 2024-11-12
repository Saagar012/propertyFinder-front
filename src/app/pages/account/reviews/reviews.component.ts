import { Component, OnInit } from '@angular/core';

import { aboutReviews, youReviews } from './reviews.model';
import { aboutReviewData, youReviewData  } from './data';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

/**
 * Reviews Component
 */
export class ReviewsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  aboutReviewData!: aboutReviews[];
  youReviewData!: youReviews[];
  readonly = false;

  constructor() { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Account', link:'/account/info' },
      { label: 'Reviews', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();
  }

   // Chat Data Fetch
   private _fetchData() {
    this.aboutReviewData = aboutReviewData;
    this.youReviewData = youReviewData;
  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }

  // Sort filter
  sortField:any;
  sortBy:any
  SortFilter(){
    this.sortField = (document.getElementById("review-sorting1") as HTMLInputElement).value;
    if (this.sortField[0] == 'A') {
      this.sortBy = 'desc';
      this.sortField = this.sortField.replace(/A/g, '')
    }
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }

  // Review Sort filter
  sortReviewField:any;
  sortReviewBy:any
  SortReviewFilter(){
    this.sortReviewField = (document.getElementById("review-sorting2") as HTMLInputElement).value;
    if (this.sortReviewField[0] == 'A') {
      this.sortReviewBy = 'desc';
      this.sortReviewField = this.sortReviewField.replace(/A/g, '')
    }
    if (this.sortReviewField[0] == 'D') {
      this.sortReviewBy = 'asc';
      this.sortReviewField = this.sortReviewField.replace(/D/g, '')
    }
  }


}
