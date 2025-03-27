import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider

import { properties, finder, agent, pager } from './home2.model';
import { propertiesData, finderData, agentData, pagerData } from './data';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})

/**
 * Home2 Component
 */
export class Home2Component implements OnInit {

  propertiesData!: properties[];
  finderData!: finder[];
  agentData!: agent[];
  pagerData!: pager[];


  constructor(private modalService: NgbModal) { }

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
    this.propertiesData = propertiesData;
    this.finderData = finderData;
    this.agentData = agentData;
    this.pagerData = pagerData;
  }

  /**
   * Swiper setting
   */
  config = {
    slidesPerView: 1,
    navigation: true
  };

  /**
   * Top properties on Finder
   */
  Finder = {
    slidesToShow: 2, // Number of slides to show initially
    slidesToScroll: 1, // Number of slides to scroll at a time
    initialSlide: 0, // Index of the initial slide
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
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
