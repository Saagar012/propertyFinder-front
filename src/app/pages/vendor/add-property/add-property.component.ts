import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from 'src/app/core/services/property/property.service';

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
  public overviewColleaps = true;
  public amenitiesColleaps = true;
  propertyForm!: UntypedFormGroup;
  selectedImages: File[] = [];



  constructor(private modalService: NgbModal, private fb: UntypedFormBuilder, private propertyService: PropertyService) { }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Add property', active: true }
    ];
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(48)]],
      category: ['', Validators.required],
      propertyType: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      streetAddress: ['', Validators.required],
      bedrooms: ['1', Validators.required],  
      bathrooms: ['1', Validators.required], 
      parkingSpots: ['1', Validators.required], 
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
      latitude: [''],
      longitude: [''],
      status: ['AVAILABLE'],
      totalArea: ['',Validators.required],
      userId: [1], // Set this dynamically as needed
      contactInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required]
      }),
      price: this.fb.group({
        amount: ['', [Validators.required, Validators.min(0)]],
        timeDuration: ['ANNUALLY'] 
      })
    });
  }

  onSelect(event: any) {
    // Add selected files to the array
    this.selectedImages.push(...event.addedFiles);
  }

propertySubmit() {
  // if (this.propertyForm.invalid) {
  //   return;
  // }
      // Call the signup service
      console.log('property form value', this.propertyForm.value);
      console.log('property form value images', this.selectedImages);

      this.propertyService.createProperty(this.propertyForm.value, this.selectedImages).subscribe({
        next: (response) => {
          alert('Property Created successfully');
        },
        error: (error) => {
          console.error('Signup failed:', error);
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
