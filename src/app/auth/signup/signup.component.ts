import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
  errorMessage: string = '';  // Store errors if any


  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
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
      if (this.validationform.invalid) {
        return;
      }

      const formData = this.validationform.value;
  
      // Call the signup service
      this.authService.signup(formData).subscribe({
        next: (response) => {
          alert('Signup successful!');
        },
        error: (error) => {
          console.error('Signup failed:', error);
          this.errorMessage = 'Signup failed. Please try again.';
          alert(this.errorMessage);
        }
      });
    }
  

    /**
   * Returns form
   */
    get form() {
      return this.validationform.controls;
    }

}
