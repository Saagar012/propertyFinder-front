import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})

/**
 * SingleBlog Component
 */
export class SingleBlogComponent implements OnInit {

   // bread crumb items
   breadCrumbItems!: Array<{}>;
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
      { label: 'Blog', link:'/pages/blog-grid' },
      { label: 'How Real Estate Drone Photography Can Elevate Your Listing?', active: true }
    ];

     /**
     * Bootstrap validation form data
     */
      this.validationform = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        comment: ['', [Validators.required]],
      });
  }

  inView(ele:any){
    ele.scrollIntoView({behavior:"smooth", block:"start", inline:"start"})
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
