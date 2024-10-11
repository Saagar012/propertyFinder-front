import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

/**
 * Signin Component
 */
export class SigninComponent implements OnInit {

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
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });

    document.body.classList.add('bg-secondary');
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
