import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

/**
 * Signup Component
 */
export class SignupComponent implements OnInit {

  passTextType!: boolean;
  fieldTextType!: boolean;
  //  Validation form
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    });

    document.body.classList.add('bg-secondary');

  }

  /**
   * Password Hide/Show
   */
   togglePassFieldTextType() {
    this.passTextType = !this.passTextType;
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
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
