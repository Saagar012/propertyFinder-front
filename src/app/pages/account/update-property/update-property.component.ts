import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from 'src/app/core/services/property/property.service';
import * as L from 'leaflet';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { propertyById, recently } from '../../catalog/single-v1/single-v1.model';
import { aboutReviews } from '../reviews/reviews.model';
import { StaticDataService } from 'src/app/core/services/static-data.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrl: './update-property.component.scss'
})
export class UpdatePropertyComponent {
  private map: any;
  private marker: any;
  dropconfig = {
    clickable: true,
    maxFiles: 5, // Set the maximum number of files to upload.
    addRemoveLinks: true,
    acceptedFiles: 'image/jpeg, image/jpg, image/png'
  };
  uploadedFiles: File[] = [];
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  longitude = 20.728218;
  latitude = 52.128973;
  public overviewColleaps = true;
  public amenitiesColleaps = true;
  propertyForm!: UntypedFormGroup;
  selectedImages: File[] = []; // Initialize selectedImages
  propertiesData!: propertyById;
  aboutReviewData!: aboutReviews[];
  trueAmenities: string[] = [];
  images!: string[];
  recentlyData!: recently[];
  rejectionMessage!: Text;



  constructor(private modalService: NgbModal, private route: ActivatedRoute, private fb: UntypedFormBuilder, private propertyService: PropertyService, private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: "" },
      { label: 'Add property', active: true }
    ];
    this._fetchData();
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
      // amenities: this.fb.group({
      //   wifi: [false],
      //   petsFriendly: [false],
      //   airConditioning: [false],
      //   balcony: [false],
      //   garage: [false],
      //   gym: [false],
      //   parking: [false],
      //   pool: [false],
      //   bar: [false],
      //   heating: [false],
      //   dishwasher: [false],
      //   kitchen: [false],
      //   securityCameras: [false]
      // }),
      latitude: [""],
      longitude: [""],
      status: ['AVAILABLE'],
      amount: ["", [Validators.required, Validators.min(1)]],
      totalAreaInMeterSq: ["", Validators.required],
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
      // Check if adding these files would exceed the limit of 6
      const totalFiles = this.selectedImages.length + input.files.length;

      if (totalFiles <= 6) {
        this.selectedImages.push(...Array.from(input.files));
      }
      console.log("while selecting the image", this.selectedImages);

    }
  }

  removeFile(index: number) {
    this.selectedImages.splice(index, 1); // Remove the file at the specified index
    console.log("after removing the image", this.selectedImages);
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
    const propertyId = this.route.snapshot.paramMap.get('id');

    if (this.propertyForm.invalid) {
      return;
    }
    this.propertyService.updateProperty(this.propertyForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Property Updated successfully!',
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
  openRejectModal(rejectContent: any) {
    this.modalService.open(rejectContent, { size: 'lg', windowClass: 'modal-holder' });
  }
  
  // Data Fetch
  private _fetchData() {
    // Retrieve the 'id' parameter from the URL
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      // Convert the ID to a number if necessary and fetch property details
      this.propertyService.fetchMyPropertyById(propertyId).subscribe(
        (response) => {
          this.propertiesData = response.data; // Assign response to propertiesData
          this.images = response.data.images;
          this.rejectionMessage = response.data.rejectionMessage;
          // Populate form fields
          this.propertyForm.patchValue({
            title: response.data.title,
            category: response.data.category,
            propertyType: response.data.propertyType,
            country: response.data.country,
            zipCode: response.data.zipCode,
            city: response.data.city,
            streetAddress: response.data.streetAddress,
            bedrooms: response.data.bedrooms || "1",
            bathrooms: response.data.bathrooms || "1",
            parkingSpots: response.data.parkingSpots || "1",
            description: response.data.description,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            status: response.data.status || 'AVAILABLE',
            amount: response.data.amount,
            totalAreaInMeterSq: response.data.totalArea,
            rejectionMessage:response.data.rejectionMessage,
            // Populate nested contact info
            contactInfo: {
              firstName: response.data.contactInfo?.firstName,
              lastName: response.data.contactInfo?.lastName,
              email: response.data.contactInfo?.email,
              phoneNumber: response.data.contactInfo?.phoneNumber
            },

            // Populate nested amenities
            amenities: {
              wifi: response.data.amenities?.wifi || false,
              petsFriendly: response.data.amenities?.petsFriendly || false,
              airConditioning: response.data.amenities?.airConditioning || false,
              balcony: response.data.amenities?.balcony || false,
              garage: response.data.amenities?.garage || false,
              gym: response.data.amenities?.gym || false,
              parking: response.data.amenities?.parking || false,
              pool: response.data.amenities?.pool || false,
              bar: response.data.amenities?.bar || false,
              heating: response.data.amenities?.heating || false,
              dishwasher: response.data.amenities?.dishwasher || false,
              kitchen: response.data.amenities?.kitchen || false,
              securityCameras: response.data.amenities?.securityCameras || false
            }



          // Add other fields as needed
        });

      console.log("response from the backend", response.data);

      // Step 1: Filter amenities with `true` values
      this.trueAmenities = Object.keys(this.propertiesData?.amenities || {}).filter(
        (key: string) => this.propertiesData?.amenities?.[key] === true
      );
      this.updateBreadcrumb();
    },
    (error) => {
      console.error("Error fetching property by ID:", error);
    }
          );

  } else {
  console.warn("No property ID found in the URL");
}

this.aboutReviewData = this.aboutReviewData;
this.fetchOtherProperties();
      }
    
    private fetchOtherProperties() {
  const formData = { minArea: 0 };

  (this.propertyService.getFilteredProperties(formData).subscribe(response => {
    if (response && response.data) { // Check if response has data property
      this.recentlyData = response.data.map((item: any) => this.transformProperty(item));
    } else {
      console.error("No data found in response");
    }
  }));
}
    private transformProperty(item: any): recently {
  return {
    id: item.id,
    image: item.images ? item.images[0] : '',
    status: item.status,
    verified_btn: item.status === this.staticDataService.PROPERTY_STATUS.VERIFIED ? 'Available' : 'Not Available',
    btn_color: item.status === this.staticDataService.PROPERTY_STATUS.VERIFIED ? 'success' : 'danger',
    title: item.title,
    sale: item.category,
    price: item.totalPrice ? `$${item.totalPrice}` : 'N/A',
    bed: item.bedrooms ? `${item.bedrooms} Bed` : 'N/A',
    bath: item.bathrooms ? `${item.bathrooms} Bath` : 'N/A',
    car: item.parkingSpots ? `${item.parkingSpots} Parking` : 'N/A',
  };
}

updateBreadcrumb() {
  this.breadCrumbItems = [
    { label: 'Home', link: '' },
    { label: this.propertiesData.category, link: '/catalog/rent' },
    { label: this.propertiesData.title, active: true }
  ];
}
 
}

