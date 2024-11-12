import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

/**
 * AddProperty Component
 */
export class AddPropertyComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  longitude = 20.728218;
  latitude = 52.128973;
  address: string = '';
  public overviewColleaps = true;
  public amenitiesColleaps = true;

  private map: L.Map | undefined; // Variable to hold the map instance
  private marker: L.Marker | undefined; // Variable for the marker

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Add property', active: true }
    ];
    this.initMap(); // Initialize the map on component load
  
  }

  initMap(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    

    // Add a marker at the initial position
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }

  updateMap(): void {
    const location = this.address;

    // Use the Nominatim API to get the coordinates of the location
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        this.latitude = data[0].lat;
        this.longitude = data[0].lon;

        // Ensure the map is defined before trying to use it
        if (this.map) {
          this.map.setView([this.latitude, this.longitude], 13);  // Update map view

          // If a marker already exists, remove it
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }

          // Add the new marker
          this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
        } else {
          console.error('Map instance is undefined');
        }
      } else {
        alert('Location not found');
      }
    })
  
    .catch(err => console.error(err));
  }
  inView(ele: any) {
    ele.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
  }

  /**
   * Open Review modal
   * @param reviewContent modal content
   */
  openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { size: 'fullscreen', windowClass: 'modal-holder' });
  }

  dropconfig = {
    clickable: true,
    maxFiles: 5, // Set the maximum number of files to upload.
    addRemoveLinks: true,
  };
  uploadedFiles: File[] = [];

}
