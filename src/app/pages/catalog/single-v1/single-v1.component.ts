import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Light Box
import { Lightbox } from 'ngx-lightbox';

import { aboutReviews, propertyById, recently } from './single-v1.model';
import { aboutReviewData, recentlyData } from './data';
import { PropertyService } from 'src/app/core/services/property/property.service';
import { ActivatedRoute } from '@angular/router';
import { properties } from '../../dashboard/home2/home2.model';

@Component({
  selector: 'app-single-v1',
  templateUrl: './single-v1.component.html',
  styleUrls: ['./single-v1.component.scss']
})

/**
 * SingleV1 Component
 */
export class SingleV1Component implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  aboutReviewData!: aboutReviews[];
  recentlyData!: recently[];
  public overviewColleaps = true;
  public amenitiesColleaps = true;
  //  Validation form
  validationform!: UntypedFormGroup;
  signUpform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;
  longitude = 20.728218;
  latitude = 52.128973;
  _album: Array<any> = [];
  propertiesData!: propertyById;
  trueAmenities: string[] = [];



  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder, private _lightbox: Lightbox
    , private propertyService: PropertyService, private route: ActivatedRoute
  ) {
    for (let i = 4; i <= 8; i++) {
      const src = 'assets/img/city-guide/single/th0' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'assets/img/city-guide/single/th0' + i + '.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this._album.push(album);
    }

  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Property for rent', link: '/catalog/rent' },
      { label: 'Pine Apartments', active: true }
    ];

    /**
    * Bootstrap validation form data
    */
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    /**
     * Bootstrap validation form data
     */
    this.signUpform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    // Data Get Function
    this._fetchData();
  }
  // Method to return the appropriate icon class for each amenity key
  
getAmenityIcon(key: string): string {
  const iconMap: { [key: string]: string } = {
    wifi: 'fi-wifi',
    heating: 'fi-thermometer',
    dishwasher: 'fi-dish',
    freeParking: 'fi-parking',
    airConditioning: 'fi-snowflake',
    iron: 'fi-iron',
    tv: 'fi-tv',
    laundry: 'fi-laundry',
    securityCameras: 'fi-cctv'
    // Add more mappings as needed
  };
  return iconMap[key] || 'fi-default'; // Provide a default icon class if needed
}

// Method to format the amenity name
formatAmenityName(key: string): string {
  // Use basic formatting or mapping for more readable names
  return key
    .replace(/([A-Z])/g, ' $1') // Add a space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}


  // Data Fetch
  private _fetchData() {
    // Retrieve the 'id' parameter from the URL
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (true) {
      // Convert the ID to a number if necessary and fetch property details
      this.propertyService.fetchPropertyById(7).subscribe(
        (response) => {
          console.log("Fetched property by ID:", response);
          this.propertiesData = response.data; // Assign response to propertiesData
          console.log('successfully fetched data by id', this.propertiesData);

          // Step 1: Filter amenities with `true` values
          this.trueAmenities = Object.keys(this.propertiesData?.amenities || {}).filter(
            (key: string) => this.propertiesData?.amenities?.[key] === true
          );
        },
        (error) => {
          console.error("Error fetching property by ID:", error);
        }
      );
    } else {
      console.warn("No property ID found in the URL");
    }

    this.aboutReviewData = aboutReviewData;
    this.recentlyData = recentlyData;
    // fetching the property by id.
    // this.propertyService.fetchPropertyById();
  }


  /**
   * Open Review modal
   * @param reviewContent modal content
   */
  openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { centered: true });
  }

  /**
   * Open Review modal
   * @param content modal content
   */
  openMapModal(content: any) {
    this.modalService.open(content, { size: 'fullscreen', centered: true });
  }

  /**
   * Swiper setting
   */
  config = {
    slidesToShow: 4, // Number of slides to show initially
    slidesToScroll: 1, // Number of slides to scroll at a time
    initialSlide: 0, // Index of the initial slide
    dots: true, // Display pagination dots
    arrows: true, // Display navigation arrows
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
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
    return this.signUpform.controls;
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  customOpen(a: any): void {
    // open lightbox
    this._lightbox.open(this._album, a);
  }

  // Sort filter
  sortField: any;
  sortBy: any
  SortFilter() {
    this.sortField = (document.getElementById("reviews-sorting") as HTMLInputElement).value;
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
