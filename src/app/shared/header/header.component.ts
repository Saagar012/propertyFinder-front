import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event.service';

import { Router, NavigationEnd } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

/**
 * Header Component
 */
export class HeaderComponent implements OnInit {
  mode: string | undefined;
  
  loginPassfield!: boolean;
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  menuItems: MenuItem[] = [];
  //  Validation form
  validationform!: UntypedFormGroup;
  signUpform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;
  errorMessage: string = '';  // Store errors if any

  //User's data
  username: string | null = null;


  @ViewChild('sideMenu') sideMenu!: ElementRef;

  constructor(private router: Router,private modalService: NgbModal, private staticDataService: StaticDataService, private eventService: EventService, private authService: AuthService,  private formBuilder: UntypedFormBuilder) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activateMenu();
      }
    });
  }

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    /**
     * Bootstrap validation form data
     */
     this.signUpform = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],

    });
  

    // Menu Items
    this.menuItems = MENU;
    // this.username = this.authService.getUser();
    this.authService.user$.subscribe((user) => {
      this.username = user || null; // Adjust based on your user object
    });

    this.checkUserInLocalStorage();

  }
  checkUserInLocalStorage(){
    if(localStorage.getItem('user')){
      this.username = localStorage.getItem('user');
    }
  }

   /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar');
    if (document.documentElement.scrollTop > 40) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.remove('show');
    }
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
   toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'lg', centered: true });
  }
  secondModal(toggleSecondModal: any) {
    this.modalService.open(toggleSecondModal, { size: 'lg', centered: true });
  }

  /**
   * Password Hide/Show
   */
   toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  /**
   * Password Hide/Show
   */
   toggleSignUpPassField() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
   * Password Hide/Show
   */
   toggleSignUpCPassField() {
    this.signupCPassfield = !this.signupCPassfield;
  }


   /**
  * On menu click
  */
    onMenuClick(event: any) {
      const nextEl = event.target.nextElementSibling;
      if (nextEl) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove('show');
        }
        nextEl.classList.toggle('show');
      }
      return false;
    }

    ngAfterViewInit() {
      this.activateMenu();
    }

    /**
    * Activates the menu
    */
    private activateMenu() {
      const resetParent = (el: any) => {
        const parent = el.parentElement;
        if (parent) {
          parent.classList.remove('active');
          const parent2 = parent.parentElement;
          this._removeAllClass('mm-active');
          this._removeAllClass('mm-show');
          if (parent2) {
            parent2.classList.remove('active');
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.remove('active');
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove('active');
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.remove('active');
                  const menuelement = document.getElementById(
                    'topnav-menu-content'
                  );
                  if (menuelement !== null)
                    if (menuelement.classList.contains('show'))
                      document
                        .getElementById('topnav-menu-content')!
                        .classList.remove('show');
                }
              }
            }
          }
        }
      };

      // activate menu item based on location
      const links: any = document.getElementsByClassName('side-nav-link-ref');
      let matchingMenuItem = null;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < links.length; i++) {
        // reset menu
        resetParent(links[i]);
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < links.length; i++) {
        // tslint:disable-next-line: no-string-literal
        if (location.pathname === links[i]['pathname']) {
          matchingMenuItem = links[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const parent = matchingMenuItem.parentElement;
        if (parent) {
          parent.classList.add('active');
          const parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.add('active');
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add('active');
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add('active');
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.add('active');
                }
              }
            }
          }
        }
      }
    }

    /**
    * remove active and mm-active class
    */
    _removeAllClass(className: any) {
      const els = document.getElementsByClassName(className);
      while (els[0]) {
        els[0].classList.remove(className);
      }
    }

     /**
  * Returns true or false if given menu item has child or not
  * @param item menuItem
  */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * On mobile toggle button clicked
   */
   toggleMobileMenu() {
    if (window.screen.width <= 1024) {
      document.getElementById('navbarNav')?.classList.toggle('show');
    }
  }

   /**
  * Bootsrap validation form submit method
  */
   loginSubmit() {
      this.submit = true;
       if (this.validationform.invalid) {
             return;
      }
      const formData = this.validationform.value;
    // Call the login service
    this.authService.login(formData).subscribe({
      next: (response) => {
        this.authService.setUser(response.user.firstName); // Save user data
        alert('Login successful!'); // needs to get some external module to make the alert attractive
        console.log(this.username);
        this.modalService.dismissAll('Login Successful');

      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please try again.';
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

  /**
   * Bootstrap tooltip form validation submit method
   */
   formSubmit() {
    this.formsubmit = true;
    if (this.signUpform.invalid) {
      return;
    }

    const formData ={
        ...this.signUpform.value,
        userType: this.staticDataService.USER_TYPE.USER
    }
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
   * log out
   */
  logout() {
    this.authService.logout();
    this.username = null;
  }
  /**
   * returns tooltip validation form
   */
   get formData() {
    return this.signUpform.controls;
  }

   /**
  * Demos Onclick
  */
  demosDroupDownClick() {
    document.querySelector('.demos')?.classList.toggle('show');
  }

}
