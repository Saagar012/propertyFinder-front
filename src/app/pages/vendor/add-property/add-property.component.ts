import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from 'src/app/core/services/property/property.service';
import * as L from 'leaflet';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

/**
 * AddProperty Component
 */
export class AddPropertyComponent implements OnInit {
  private map: any;
  private marker: any;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  longitude = 20.728218;
  latitude = 52.128973;
  public overviewColleaps = true;
  public amenitiesColleaps = true;
  propertyForm!: UntypedFormGroup;
  selectedImages: File[] = []; // Initialize selectedImages



  constructor(private modalService: NgbModal, private fb: UntypedFormBuilder, private propertyService: PropertyService) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: "" },
      { label: 'Add property', active: true }
    ];
    this.propertyForm = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(48)]],
      category: ["", Validators.required],
      propertyType: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      zipCode: ["", Validators.required],
      streetAddress: ["", Validators.required],
      bedrooms: ["1", Validators.required],
      bathrooms: ["1", Validators.required],
      parkingSpots: ["1", Validators.required],
      description: ["", [Validators.maxLength(1000)]],
      amenities: this.fb.group({
        wifi: [false],
        petsFriendly: [false],
        airConditioning: [false],
        balcony: [false],
        garage: [false],
        gym: [false],
        parking: [false],
        pool: [false],
        bar: [false],
        heating: [false],
        dishwasher: [false],
        kitchen: [false],
        securityCameras: [false]
      }),
      latitude: [""],
      longitude: [""],
      status: ['AVAILABLE'],
      amount: ["", [Validators.required, Validators.min(1)]],
      totalArea: ["", Validators.required],
      userId: [1], // Set this dynamically as needed
      contactInfo: this.fb.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required]],
        phoneNumber: ["", Validators.required]
      }),
    });
    this.initializeMap();
    var map = L.map('map').setView([48.3809, -89.2477], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);



  }
  searchLocation(): void {
    const location = (document.getElementById('location-input') as HTMLInputElement).value;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;
          // Update the form with latitude and longitude
          this.propertyForm.patchValue({
            latitude: lat,
            longitude: lon
          });

          // Remove the existing marker, if any
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }

          // Add the new marker
          this.marker = L.marker([lat, lon]).addTo(this.map);
          this.map.setView([lat, lon], 13);
        } else {
          alert('Location not found');
        }
      })
      .catch(err => console.error(err));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages.push(...Array.from(input.files));
      console.log('Selected files:', this.selectedImages);
    }
  }

  initializeMap(): void {
    this.map = L.map('map').setView([48.3809, -89.2477], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  propertySubmit() {

    // Call the signup service
    console.log(this.propertyForm.value);
    if (this.propertyForm.invalid) {
      return;
    }
    this.propertyService.createProperty(this.propertyForm.value, this.selectedImages).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Property Created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        window.location.href = `/account/properties`;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while creating the property.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    });
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
    acceptedFiles: 'image/jpeg, image/jpg, image/png'
  };
  uploadedFiles: File[] = [];

}

