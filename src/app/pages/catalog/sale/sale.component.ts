import { Component, OnInit } from '@angular/core';

// Range Slider
import { Options } from 'ngx-slider-v2';

import { topOffer } from './sale.model';
import { topOfferData } from './data';
import { PropertyService } from 'src/app/core/services/property/property.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
  checkedVal: any[] = [];
  filterForm: FormGroup;


  constructor(private propertyService: PropertyService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      city: [''],
      country: [''],
      propertyType: this.fb.array([]),
       minPrice: [''],
      maxPrice: [''],
      bedrooms: [''],
      bathrooms: [''],
      // Add fields for amenities
      parking: [false],
      pool: [false],
      gym: [false]
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

    // Data Get Function
    this._fetchData();
  }

  // Data Fetch
  private _fetchData() {
    //  this.propertiesData = propertiesData;
    (this.propertyService.fetchProperties().subscribe(response => {
      if (response && response.data) { // Check if response has data property
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
        console.log("consoliing the transformed data", response.data.map((item: any) => this.transformProperty(item)));
        // this.topOfferData = topOfferData;

        this.topOfferDatas = Object.assign([], this.topOfferData);
        this.dataCount = response.pagination.totalItems;

      } else {
        console.error("No data found in response");
      }
    }));
  }
  private transformProperty(item: any): topOffer {
    return {
      id: item.id,
      image: item.images ? item.images[0] : '',
      verified_btn: item.status === 'AVAILABLE' ? 'Available' : 'Not Available',
      btn_color: item.status === 'AVAILABLE' ? 'green' : 'red',
      title: item.title,
      streetAddress: item.streetAddress,
      location: item.city,
      property: item.propertyType,
      sale: item.category,
      price: item.priceAmountPerAnnum ? `$${item.priceAmountPerAnnum} per annum` : 'N/A',
      bed: item.bedrooms ? `${item.bedrooms} Bed` : 'N/A',
      bath: item.bathrooms ? `${item.bathrooms} Bath` : 'N/A',
      car: item.parkingSpots ? `${item.parkingSpots} Parking` : 'N/A',
      metres: item.totalAreaInMeterSq
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

      // this.checkedVal.push(type);
      // this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
      // this.topOfferDatas = Object.assign([], this.topOfferData);
      // this.dataCount = response.pagination.totalItems;
      // this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.property));
    }
    else {
      // var index = this.checkedVal.indexOf(type);
      const index = propertyTypeArray.controls.findIndex((control: any) => control.value === type);

      if (index > -1) {
        // this.checkedVal.splice(index, 1);
        propertyTypeArray.removeAt(index);

      }
      // this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.property));
    }
    // if (this.checkedVal.length == 0) {
    //   this.topOfferDatas = this.topOfferData
    // }
    // this.dataCount = this.topOfferDatas.length;
    // this.filterForm.patchValue({ propertyType: propertyTypeArray });
    console.log("consolign the property type array", propertyTypeArray)
    console.log("consoling the filter form", this.filterForm.value);

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
  minValue: number = 750;
  maxValue: number = 2500;
  options: Options = {
    floor: 300,
    ceil: 5000
  };


  valueChange(value: number, boundary: boolean): void {
    if (boundary) {
      this.minValue = value;
      this.filterForm.patchValue({ minPrice: value });

    } else {
      this.maxValue = value;
      this.filterForm.patchValue({ maxPrice: value });

      this.topOfferDatas = this.topOfferData.filter((data: any) => {
        data.price = data.price.replace(/,/g, '')
        return data.price >= this.minValue && data.price <= this.maxValue;
      });
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Bed-Rooms  Filter
  // bedrooms(value: any) {
  //   if (value > 3) {
  //     this.topOfferDatas = this.topOfferData.filter((data: any) => {
  //       return data.bad >= value;
  //     });
  //   }
  //   else {
  //     this.topOfferDatas = this.topOfferData.filter((data: any) => {
  //       return data.bad === value;
  //     });
  //   }
  //   this.dataCount = this.topOfferDatas.length;
  // }

  // Bed-Rooms  Filter
  // bathrooms(value: any) {
  //   this.topOfferDatas = this.topOfferData.filter((data: any) => {
  //     return data.bath === value;
  //   });
  //   this.dataCount = this.topOfferDatas.length;
  // }

  // Square metres Filter
  minMeters: any | undefined;
  maxMeters: any | undefined;
  metresSearch() {
    this.minMeters = document.getElementById("minValue") as HTMLAreaElement;
    this.maxMeters = document.getElementById("maxValue") as HTMLAreaElement;
    this.topOfferDatas = this.topOfferData.filter((data: any) => {
      return data.metres >= this.minMeters.value || data.metres <= this.maxMeters.value;
    });
    this.dataCount = this.topOfferDatas.length;
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

  // Property  Filter
  AmenitiesFilter(e: any, type: any) {
    if (e.target.checked) {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.amenities));
    }
    else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.amenities));
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData
    }
    this.dataCount = this.topOfferDatas.length;
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
