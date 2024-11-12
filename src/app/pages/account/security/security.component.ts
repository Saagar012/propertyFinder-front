import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})

/**
 * Security Component
 */
export class SecurityComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  fieldTextType!: boolean;
  fieldNewTextType!: boolean;
  confirmfieldTextType!: boolean;

  //  Validation form
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Account', link:'/account/info' },
      { label: 'Password & Security', active: true }
    ];

    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
      apassword: ['', [Validators.required]],
      npassword: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    });

  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

   /**
   * Password Hide/Show
   */
    toggleNewFieldTextType() {
      this.fieldNewTextType = !this.fieldNewTextType;
    }

    /**
   * Password Hide/Show
   */
     toggleConfirmFieldTextType() {
      this.confirmfieldTextType = !this.confirmfieldTextType;
    }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
      document.getElementById('account-nav')?.classList.toggle('show');
  }

  /**
  * Bootsrap validation form submit method
  */
   validSubmit() {
    this.submit = true;
  }

  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }


}
