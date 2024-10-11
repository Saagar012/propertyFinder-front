import { Component, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

import { apartments, recently } from './single-v2.model';
import { apartmentsData, recentlyData } from './data';

// import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-single-v2',
  templateUrl: './single-v2.component.html',
  styleUrls: ['./single-v2.component.scss']
})

/**
 * SingleV2 Component
 */
export class SingleV2Component {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  apartmentsData!: apartments[];
  recentlyData!: recently[];
  public firstColleaps = true;

  id = 'dofyR9p8e7w';
  private player: any;
  private ytEvent: any;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Property for rent', link: '/catalog/rent' },
      { label: 'Pine Apartments', active: true }
    ];

    // Data Get Function
    this._fetchData();
  }

  // Data Fetch
  private _fetchData() {
    this.apartmentsData = apartmentsData;
    this.recentlyData = recentlyData;
  }

  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    navigation: true
  };

  /**
   * Swiper setting
   */
  recently = {
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
    ]
  };

  // Youtube Player
  onStateChange(event: any) {
    this.ytEvent = event.data;
  }
  savePlayer(player: any) {
    this.player = player;
  }
  playVideo() {
    this.player.playVideo();
  }
  pauseVideo() {
    this.player.pauseVideo();
  }

  // Imageslider: SwiperOptions = {
  //   spaceBetween: 10,
  //   direction: 'horizontal',
  //   slidesPerView: 5
  // }

  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
    swiper.forEach((el: any) => {
      el.classList.remove('tns-nav-active')
    })
    event.target.closest('.swiperlist').classList.add('tns-nav-active')
    this.slickModal.slickGoTo(id)
  }
  slickChange(event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
  }

}
