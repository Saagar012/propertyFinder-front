import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { topOffer, sale } from './properties.model';
import { rentData, saleData } from './data';

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
  rentData!: topOffer[];
  saleData!: sale[];
  showNavigationIndicators: any;
  public overviewColleaps = true;
   //  Validation form
   validationform!: UntypedFormGroup;
   submit!: boolean;
   formsubmit!: boolean;

  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder) { }

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
        message: ['', [Validators.required]],
      });

     // Chat Data Get Function
     this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.rentData = rentData;
    this.saleData = saleData;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * Swiper setting
   */
   config = {
    slidesPerView: 1,
    navigation: true,
    loop:true
  };

  /**
   * Swiper setting
   */
   saleSlider = {
    slidesPerView: 1,
    navigation: true,
    loop:true
  };

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

  // Sort filter
  sortField:any;
  sortBy:any
  SortFilter(){
    this.sortField = (document.getElementById("sortby") as HTMLInputElement).value;
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
