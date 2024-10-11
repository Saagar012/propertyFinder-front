import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { Options } from 'ngx-slider-v2';

// Swiper Slider
// import { SwiperOptions } from 'swiper';

import { topOffer, propertyCity, estateAagents, service, companies } from './home1.model';
import { topOfferData, cityData, agentsData, servicesData, companiesData } from './data';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    // Chat Data Get Function
    this._fetchData();
    this.filterredImages = this.list;

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
    this.topOfferData = topOfferData;
    this.cityData = cityData;
    this.agentsData = agentsData;
    this.servicesData = servicesData;
    this.companiesData = companiesData;
  }

  /**
   * Swiper setting
   */
  config = {
    infinite: true,        // Optional: Enables infinite loop
    dots:true,
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
  filterredImages: { image: string; verified_btn?: string; btn: string; btn_color: string; sale: string; title: string; location: string; price: string; category: string; }[] | undefined;
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
  activeCategory(category: string) {
    this.galleryFilter = category;
    if (this.galleryFilter === 'Houses') {
      this.filterredImages = this.list.filter(x => x.category === this.galleryFilter);
    } else {
      this.filterredImages = this.list.filter(x => x.category === this.galleryFilter);
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }


}
