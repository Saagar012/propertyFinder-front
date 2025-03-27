import { Component, OnInit } from '@angular/core';

// Range Slider
import { Options } from 'ngx-slider-v2';

import { topOffer } from './sale.model';
import { topOfferData } from './data';
import { PropertyService } from 'src/app/core/services/property/property.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StaticDataService } from 'src/app/core/services/static-data.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})

/**
 * Sale Component
 */
export class SaleComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  topOfferData!: topOffer[];
  longitude = 20.728218;
  latitude = 52.128973;
  dataCount: any;
  currentPage: any;
  totalPages: any;
  pageNumbers:any;
  limit: number = 4;
  page: number = 1;

  checkedVal: any[] = [];
  filterForm: FormGroup;
  category: string | null = null;
  amenityKeys = [
    { key: 'bar', label: 'Bar' },
    { key: 'gym', label: 'Gym' },
    { key: 'pool', label: 'Pool' },
    { key: 'wifi', label: 'WiFi' },
    { key: 'garage', label: 'Garage' },
    { key: 'balcony', label: 'Balcony' },
    { key: 'heating', label: 'Heating' },
    { key: 'kitchen', label: 'Kitchen' },
    { key: 'parking', label: 'Parking' },
    { key: 'dishwasher', label: 'Dishwasher' },
    { key: 'petsFriendly', label: 'Pets Friendly' },
    { key: 'airConditioning', label: 'Air Conditioning' },
    { key: 'securityCameras', label: 'Security Cameras' },
  ];


  constructor(private propertyService: PropertyService, private fb: FormBuilder, private route: ActivatedRoute, private staticDataService: StaticDataService) {
    this.filterForm = this.fb.group({
      city: [''],
      country: [''],
      propertyType: this.fb.array([]),
      minPrice: [''],
      maxPrice: [''],
      bedrooms: [''],
      bathrooms: [''],
      minArea: [''],
      maxArea: [''],
      // Add fields for amenities
      amenities: this.fb.group({
        bar: [false], // Amenity: Bar
        gym: [false], // Amenity: Gym
        pool: [false], // Amenity: Pool
        wifi: [false], // Amenity: WiFi
        garage: [false], // Amenity: Garage
        balcony: [false], // Amenity: Balcony
        heating: [false], // Amenity: Heating
        kitchen: [false], // Amenity: Kitchen
        parking: [false], // Amenity: Parking
        dishwasher: [false], // Amenity: Dishwasher
        petsFriendly: [false], // Amenity: Pets Friendly
        airConditioning: [false], // Amenity: Air Conditioning
        securityCameras: [false], // Amenity: Security Cameras
      }),

    });
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Property for sale', active: true }
    ];


    this._fetchDataFromParams();

  }
  private _fetchDataFromParams(page:number = 1) {
    // Get the category query parameter
    this.route.queryParams.subscribe((params) => {
      const propertyType = params['propertyType'] || null;
      const city = params['city'] || null;
      if (propertyType) {
        const propertyTypeArray = Array.isArray(propertyType) ? propertyType : [propertyType];
        const propertyTypeFormArray = this.filterForm.get('propertyType') as FormArray;
        propertyTypeFormArray.clear(); // Clear existing values

        propertyTypeArray.forEach((type) => propertyTypeFormArray.push(this.fb.control(type)));
      } 
       if (city) {
        this.filterForm.patchValue({ city: city }); // Add category to the form        
      }
      this.propertyService.getFilteredProperties(this.filterForm.value, page).subscribe((response) => {
        if (response && response.data) {
          console.log(response.data);
          this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
          this.topOfferDatas = Object.assign([], this.topOfferData);
          this.dataCount = response.pagination.pageSize;
          this.currentPage = response.pagination.currentPage;
          this.totalPages = response.pagination.totalPages;
        // Generate the page numbers for navigation
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        } else {
          console.error("No data found in response");
        }
      });
    });

  }
  // Data Fetch
  private _fetchData() {
    (this.propertyService.fetchProperties(this.page, this.limit, this.staticDataService.PROPERTY_STATUS.ALL_STATUS).subscribe(response => {
      if (response && response.data) { // Check if response has data property
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
        this.topOfferDatas = Object.assign([], this.topOfferData);
        this.dataCount = response.pagination.totalItems;

      } else {
        console.error("No data found in response");
      }
    }));
  }

  goToPage(page: number) {
    console.log("clicked");
    console.log("page", page);
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this._fetchDataFromParams(page); // Refetch data for the selected page
    }
  }
  
  private transformProperty(item: any): topOffer {
    return {
      id: item.id,
      image: item.images ? item.images[0] : '',
      verified_btn: item.status === this.staticDataService.PROPERTY_STATUS.VERIFIED  ? 'Available' : 'Not Available',
      btn_color: item.status === this.staticDataService.PROPERTY_STATUS.VERIFIED  ? 'success' : 'danger',
      title: item.title,
      streetAddress: item.streetAddress,
      location: item.city,
      property: item.propertyType,
      sale: item.category,
      price: item.totalPrice ? `$${item.totalPrice}` : 'N/A',
      bed: item.bedrooms ? `${item.bedrooms} Bed` : 'N/A',
      bath: item.bathrooms ? `${item.bathrooms} Bath` : 'N/A',
      car: item.parkingSpots ? `${item.parkingSpots} Parking` : 'N/A',
      metres: item.totalAreaInMeterSq,
      status:item.status
    };
  }
  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true
  };

  /**
    * Filter button clicked
    */
  FilterSidebar() {
    document.getElementById('filters-sidebar')?.classList.toggle('show');
    document.querySelector('.vertical-overlay')?.classList.toggle('show');
  }

  /**
  * SidebarHide modal
  * @param content modal content
  */
  SidebarHide() {
    document.getElementById('filters-sidebar')?.classList.remove('show');
    document.querySelector('.vertical-overlay')?.classList.remove('show');
  }

  // Map Model Open
  openMapModal() {
    document.querySelector('.map-popup')?.classList.remove('invisible');
  }

  // Map Model Open
  closeMapModel() {
    document.querySelector('.map-popup')?.classList.add('invisible');
  }


  topOfferDatas: any;


  LocationSearch(): void {
    (this.propertyService.getFilteredProperties(this.filterForm.value).subscribe(response => {
      if (response && response.data) {
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
        this.topOfferDatas = Object.assign([], this.topOfferData);
        this.dataCount = response.pagination.totalItems;

      } else {
        console.error("No data found in response");
      }
    }));
  }

  // District Filter
  DistrictSearch() {
    var district = document.getElementById("district") as HTMLInputElement;
    this.topOfferDatas = this.topOfferData.filter((data: any) => {
      return data.district === district.value;
    });
    this.dataCount = this.topOfferDatas.length;
  }

  // Property  Filter
  changeProperty(e: any, type: any) {
    const propertyTypeArray = this.filterForm.get('propertyType') as FormArray;

    if (e.target.checked) {
      // Add type if not already present
      propertyTypeArray.push(this.fb.control(type));
    }
    else {
      // var index = this.checkedVal.indexOf(type);
      const index = propertyTypeArray.controls.findIndex((control: any) => control.value === type);

      if (index > -1) {
        // this.checkedVal.splice(index, 1);
        propertyTypeArray.removeAt(index);

      }
    }

    (this.propertyService.getFilteredProperties(this.filterForm.value).subscribe(response => {
      if (response && response.data) {
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
        this.topOfferDatas = Object.assign([], this.topOfferData);
        this.dataCount = response.pagination.totalItems;
      } else {
        console.error("No data found in response");
      }
    }));


  }
  /**
  * Range Slider Wise Data Filter
  */
  // Range Slider
  minValue: number = 10000; // Minimum value for the slider
  maxValue: number = 2000000; // Maximum value for the slider
  options: Options = {
    floor: 10000, // Minimum value displayed
    ceil: 2000000, // Maximum value displayed
    step: 10000, // Step interval
    translate: (value: number): string => `$${value}` // Format tooltip to show currency
  }


  valueChange(value: number, boundary: boolean): void {
    if (boundary) {
      this.minValue = value;
      this.filterForm.patchValue({ minPrice: this.minValue });

    } else {
      this.maxValue = value;
      this.filterForm.patchValue({ maxPrice: this.maxValue });

      (this.propertyService.getFilteredProperties(this.filterForm.value).subscribe(response => {
        if (response && response.data) {
          this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
          this.topOfferDatas = [...this.topOfferData];
          this.dataCount = response.pagination.totalItems;
        

        } else {
          console.error("No data found in response");
        }
      }));
    }
  }
  onAmenityChange(key: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const amenitiesGroup = this.filterForm.get('amenities') as FormGroup;
    amenitiesGroup.patchValue({ [key]: target.checked });

    // Extract form values
    const formValues = this.filterForm.value;

    // Build query parameters for amenities
    const amenitiesParams: Record<string, string> = {};
    Object.keys(formValues.amenities).forEach((amenityKey) => {
      if (formValues.amenities[amenityKey]) {
        amenitiesParams[amenityKey] = 'true';
      }
    });


    // Merge other form values and amenities into query parameters
    const queryParams = {
      ...formValues,
      ...amenitiesParams, // Include filtered amenities as query params
    };


    this.propertyService.getFilteredProperties(queryParams).subscribe(response => {
      if (response && response.data) {
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
        this.topOfferDatas = [...this.topOfferData];
        this.dataCount = response.pagination.totalItems;
      } else {
        console.error("No data found in response");
      }
    });
  }


  // Bed-Rooms  Filter
  onRoomsSelection(value: string, isBedRoom: boolean) {
    if (isBedRoom) {
      this.filterForm.patchValue({ bedrooms: value });
    } else {
      this.filterForm.patchValue({ bathrooms: value });
    }
    this.propertyService.getFilteredProperties(this.filterForm.value).subscribe(response => {
      if (response && response.data) {
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
        this.topOfferDatas = [...this.topOfferData];
        this.dataCount = response.pagination.totalItems;
      } else {
        console.error("No data found in response");
      }
    });
  }
  metresSearch(): void {
    console.log("consoling the meters search", this.filterForm.value);
    this.propertyService.getFilteredProperties(this.filterForm.value).subscribe(response => {
      if (response && response.data) {
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
        this.topOfferDatas = [...this.topOfferData];
        console.log("Filtered properties based on area:", this.topOfferDatas);
        this.dataCount = response.pagination.totalItems;
      } else {
        console.error("No data found in response");
      }
    });
  }

  // Additional options Filter
  additionalOptions(e: any, type: any) {
    if (type === 'Featured') {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.btn));
    }
    else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.btn));
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData
    }
    this.dataCount = this.topOfferDatas.length;

    if (type === 'Verified') {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.verified_btn));
    }
    else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.verified_btn));
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData
    }
    this.dataCount = this.topOfferDatas.length;
  }

  AmenitiesFilter(): void {
    const amenities = this.filterForm.get('amenities')?.value;
    console.log('Current amenities state:', amenities);
  }

  // Property  Filter
  PentsFilter(e: any, type: any) {
    if (e.target.checked) {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.pents));
    }
    else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.pents));
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Sort filter
  sortField: any;
  sortBy: any
  SortFilter() {
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
