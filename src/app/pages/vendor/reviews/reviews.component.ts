import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { aboutReviews } from './reviews.model';
import { aboutReviewData  } from './data';

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
  public overviewColleaps = true;
  //  Validation form
  validationform!: UntypedFormGroup;
  messageform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(private modalService: NgbModal,  private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Agents', link:'/vendor/properties' },
      { label: 'Floyd Miles', active: true }
    ];

     /**
     * Bootstrap validation form data
     */
      this.validationform = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        rating: ['', [Validators.required]],
        message: ['', [Validators.required]],
        review: ['', [Validators.required]],
      });

       /**
     * Bootstrap validation form data
     */
     this.messageform = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

     // Chat Data Get Function
     this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.aboutReviewData = aboutReviewData;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * Open Review modal
   * @param reviewContent modal content
   */
   openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { centered: true });
  }

  /**
  * Bootsrap validation form submit method
  */
   validSubmit() {
    this.submit = true;
  }

  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
   formSubmit() {
    this.formsubmit = true;
  }

  /**
   * returns tooltip validation form
   */
   get formData() {
    return this.messageform.controls;
  }

  // Sort filter
  sortField:any;
  sortBy:any
  SortFilter(){
    this.sortField = (document.getElementById("review-sorting") as HTMLInputElement).value;
    if (this.sortField[0] == 'A') {
      this.sortBy = 'desc';
      this.sortField = this.sortField.replace(/A/g, '')
    }
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }

}
