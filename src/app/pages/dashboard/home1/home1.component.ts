import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { Options } from 'ngx-slider-v2';

// Swiper Slider
// import { SwiperOptions } from 'swiper';

import { topOffer, propertyCity, estateAagents, service, companies } from './home1.model';
import { topOfferData, cityData, agentsData, servicesData, companiesData } from './data';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PropertyService } from 'src/app/core/services/property/property.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.scss']
})

/**
 * Index Component
 */
export class Home1Component implements OnInit {

  topOfferData!: topOffer[];
  cityData!: propertyCity[];
  agentsData!: estateAagents[];
  servicesData!: service[];
  companiesData!: companies[];
  // topOfferDatas: any;
  dataCount: any;
  propertyStatus: string = '';
  selectedType: string = 'SALE';
  selectedLocation: string = '';
  selectedPropertyType: string = '';
  calculateMortageForm!: FormGroup;
  totalApproxCost: string | null = null; 

  constructor(private modalService: NgbModal, private fb: FormBuilder, private authService: AuthService, private router: Router, private propertyService: PropertyService, private staticDataService: StaticDataService) {

    this.calculateMortageForm = this.fb.group({
      city: ['', Validators.required],
      propertyType: ['', Validators.required],
      area: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only numbers allowed
    });

  }

  ngOnInit(): void {
    // Chat Data Get Function
    this._fetchData();

    // Rent Select data
    document.getElementById("rent-content")?.addEventListener("click", function (e) {
      const input = e.target as HTMLElement;
      const rent = document.querySelector('.rent') as HTMLElement;
      rent.innerText = input.innerText;
    });

    // Location Select data
    document.getElementById("location-content")?.addEventListener("click", function (e) {
      const input = e.target as HTMLElement;
      const location = document.querySelector('.location') as HTMLElement;
      location.innerText = input.innerText;
    });

    // Property Select data
    document.getElementById("property-content")?.addEventListener("click", function (e) {
      const input = e.target as HTMLElement;
      const property = document.querySelector('.property') as HTMLElement;
      property.innerText = input.innerText;
    });

  }

  // Chat Data Fetch
  private _fetchData() {
    this.cityData = cityData;
    this.fetchTopofferData();
    this.activeCategory('APARTMENT'); // default value while loading the page to show some data;
    this.agentsData = agentsData;
    this.servicesData = servicesData;
    this.companiesData = companiesData;

  }
// Method to submit the form and send the data to the backend
onSubmit() {
  if (this.calculateMortageForm.valid) {
    const formData = this.calculateMortageForm.value; // Data from the form

    // Call the calculateMortgage method and subscribe to the response
    this.propertyService.calculateMortgage(formData).subscribe(
      (response) => {
        // Handle the response when mortgage is calculated
        this.totalApproxCost = response.totalApproxCost;
      },
      (error) => {
        // Handle the error, maybe show an error message
        Swal.fire({
          title: 'No Properties Found!',
          text: 'No properties found with the specified area to calculate the approximate price.',
          icon: 'info',
          confirmButtonText: 'Try Again'
        });
      }
    );
  } else {
    console.error("Form is invalid, cannot submit.");
  }
}


  /**
   * Swiper setting
   */
  config = {
    infinite: true,        // Optional: Enables infinite loop
    dots: true,
    slidesToShow: 4,       // Number of slides to show initially
    slidesToScroll: 1,     // Number of slides to scroll at a time
    variableWidth: false,  // Optional: Set to true if slides have varying widths
    arrows: true, // Display navigation arrows
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      }],
  };

  /**
   * Service Swiper setting
   */
  service = {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: false,
    infinite: true,
    speed: 300,
    spaceBetween: 25,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      }
    ]
  };

  /**
   * partners Swiper setting
   */
  partners = {
    initialSlide: 0,
    slidesPerView: 6,
    spaceBetween: 25
  };

  /**
   * agents Swiper setting
   */
  agents = {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  /**
   * Swiper setting
   */
  companies = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6
        }
      }
    ]
  };

  /**
  * Slider range set
  */
  visibleSelection = 455;
  visibleBarOptions: Options = {
    floor: 0,
    ceil: 1000,
    showSelectionBar: true
  };

  /**
  * Portfolio Modern Data
  */
  filterredImages: { id: string; image: string; verified_btn?: string; btn: string; btn_color: string; sale: string; title: string; streetAddress: string; price: string; status: string; category: string; }[] | undefined;
  galleryFilter = 'Houses';
  list = [{
    image: 'assets/img/real-estate/recent/01.jpg',
    verified_btn: 'Verified',
    btn: "New",
    btn_color: "bg-info",
    sale: 'For rental',
    title: 'Luxury Rental Villa',
    location: '118-11 Sutphin Blvd Jamaica, NY 11434',
    price: '$3,850',
    category: 'Houses'
  },
  {
    image: 'assets/img/real-estate/recent/02.jpg',
    verified_btn: '',
    btn: "New",
    btn_color: "bg-info",
    sale: 'For sale',
    title: 'Duplex with Garage',
    location: '21 Pulaski Road Kings Park, NY 11754',
    price: '$200,410',
    category: 'Houses',
  },
  {
    image: 'assets/img/real-estate/recent/03.jpg',
    verified_btn: '',
    btn: "New",
    btn_color: "bg-info",
    sale: 'For sale',
    title: 'Country House',
    location: '6954 Grand AveMaspeth, NY 11378',
    price: '$162,000',
    category: 'Houses',
  },
  {
    image: 'assets/img/real-estate/recent/01.jpg',
    verified_btn: 'Verified',
    btn: "New",
    btn_color: "bg-info",
    sale: 'For rental',
    title: 'Luxury Rental Villa',
    location: '118-11 Sutphin Blvd Jamaica, NY 11434',
    price: '$3,850',
    category: 'Rooms'
  },
  {
    image: 'assets/img/real-estate/recent/02.jpg',
    verified_btn: '',
    btn: "New",
    btn_color: "bg-info",
    sale: 'For sale',
    title: 'Duplex with Garage',
    location: '21 Pulaski Road Kings Park, NY 11754',
    price: '$200,410',
    category: 'Commercial',
  },
  {
    image: 'assets/img/real-estate/recent/02.jpg',
    verified_btn: '',
    btn: "New",
    btn_color: "bg-info",
    sale: 'For sale',
    title: 'Duplex with Garage',
    location: '21 Pulaski Road Kings Park, NY 11754',
    price: '$200,410',
    category: 'Apartments',
  }
  ];


  /***
  * Active all category selected
  */
  activeCategory(type: string) {
    this.galleryFilter = type;
    const filters = { propertyType: [type], latestProperty: true };
    (this.propertyService.getFilteredProperties(filters, 1, 4).subscribe(response => {
      if (response && response.data) { // Check if response has data property
        this.filterredImages = response.data.map((item: any) => this.transformProperty(item));

        this.dataCount = response.pagination.totalItems;

      } else {
        console.error("No data found in response");
      }
    }));
  }

  updateFilter(value: string, type: string): void {
    if (type === 'location') {
      this.selectedLocation = value;
    } else if (type === 'type') {
      this.selectedType = value;
    } else if (type === 'propertyType') {
      this.selectedPropertyType = value;
    }
  }


  onSearch(): void {
    // Prepare query parameters
    const queryParams = {
      type: this.selectedType,
      city: this.selectedLocation,
      propertyType: this.selectedPropertyType
    };
    // Navigate to the catalog/sale page with query parameters
    this.router.navigate(['/catalog/sale'], { queryParams });
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  private fetchTopofferData() {
    const filterData = { topOffer: true };

    (this.propertyService.getFilteredProperties(filterData, 1, 4).subscribe(response => {
      if (response && response.data) { // Check if response has data property
        this.topOfferData = response.data.map((item: any) => this.transformProperty(item));
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
      status: item.status,
      verified_btn: item.status === this.staticDataService.PROPERTY_STATUS.VERIFIED ? 'Available' : 'Not Available',
      btn: "Latest",
      btn_color: "bg-info",// btn_color: item.status === this.staticDataService.PROPERTY_STATUS.VERIFIED  ? 'green' : 'red',
      title: item.title,
      streetAddress: item.streetAddress,
      location: item.city,
      property: item.propertyType,
      sale: item.category,
      content: item.description,
      price: item.totalPrice ? `$${item.totalPrice} per annum` : 'N/A',
      bed: item.bedrooms ? `${item.bedrooms} Bed` : 'N/A',
      bath: item.bathrooms ? `${item.bathrooms} Bath` : 'N/A',
      car: item.parkingSpots ? `${item.parkingSpots} Parking` : 'N/A',
      metres: item.totalAreaInMeterSq
    };
  }

}
