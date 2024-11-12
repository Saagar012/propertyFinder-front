import { Component, OnInit } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { works, teams, customers, highlights } from './about.model';
import { worksData, teamData, customersData, highlightsData } from './data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

/**
 * About Component
 */
export class AboutComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  worksData!: works[];
  teamData!: teams[];
  customersData!: customers[];
  highlightsData!: highlights[];

  constructor() { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'About', active: true }
    ];

    // Data Get Function
    this._fetchData();
  }

  // Data Fetch
  private _fetchData() {
    this.worksData = worksData;
    this.teamData = teamData;
    this.customersData = customersData;
    this.highlightsData = highlightsData;
  }

  /**
   * Swiper setting
   */
  config = {
    slidesToShow: 1, // Number of slides to show initially
    slidesToScroll: 1, // Number of slides to scroll at a time
    initialSlide: 0, // Index of the initial slide
    dots: true, // Display pagination dots
    infinite: true, // Enable infinite loop
    arrows: true
  };

  /**
   * Swiper setting
   */
  team = {
    slidesToShow: 4, // Number of slides to show initially
    slidesToScroll: 1, // Number of slides to scroll at a time
    initialSlide: 0, // Index of the initial slide
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
   * Swiper setting
   */
  partners = {
    slidesToShow: 6, // Number of slides to show initially
    slidesToScroll: 1, // Number of slides to scroll at a time
    initialSlide: 0, // Index of the initial slide
    infinite: true, // Enable infinite loop
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
    ],
  };

  /**
   * Swiper Customers setting
   */
  customers = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 25,
  };

  /**
   * Swiper setting
   */
  carouselConfig: SlickCarouselComponent['config'] = {
    slidesToShow: 3, // Number of slides to show initially
    slidesToScroll: 1, // Number of slides to scroll at a time
    initialSlide: 0, // Index of the initial slide
    infinite: true, // Enable infinite loop
    arrows: true,
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
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

}
