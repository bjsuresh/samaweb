import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isDark = true;
  loaderVisible: boolean = true;
  showScrollTop: boolean = false;
  @ViewChild('navbarContent', { static: false }) navbarContent!: ElementRef;
  year: number = new Date().getFullYear();
  
  activeIndex: number = -1;
  dropdownOpen: boolean[] = [false, false, false, false]; // Adjust the length based on the number of sections
  currentYear: any;

  // toggleDropdown(index: number): void {
  //   this.dropdownOpen[index] = !this.dropdownOpen[index];
  // }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }

  setActive(index: number): void {
    this.activeIndex = index;
    localStorage.setItem("activeIndex",this.activeIndex.toString());
  }
  
  
  ngOnInit() {

      this.title.setTitle('SAMA Website');
    this.meta.addTags([
      { name: 'description', content: 'This is an awesome page description' },
      { name: 'keywords', content: 'Supra controls,Real Time Historian,Real Time Calculator,Web Client and Dashboards,Web Analytics,Mobile App,Alerts,Reports,SAP Interface,Web Server,Data Collectors and OPC Integrators,Alarm Management System,AE Reporter,Alarm Alerts,AE Web Client,Change Management,Root Cause Analysis,Alarm Rationalisation,Document Management System,OPC Products,Digital E-Logbook, AIMS, PIMS,EMS,Supra Advanced Manufacturing Analytics, SAMA, Grid Management System, Smart City System, Pipeline Management System, IIOT, MES, Operations Technology, Web Reporter ' }
    ]);

    this.currentYear = new Date().getFullYear();

    const storedActiveIndex = localStorage.getItem("activeIndex");
    if (storedActiveIndex !== null) {
        this.activeIndex = parseInt(storedActiveIndex, 10);
    }
    this.setActive(this.activeIndex);
    setTimeout(() => {
      this.loaderVisible = false;
    }, 1500);
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('navbar');
    if (navbar !== null) {
      if (scrollPosition > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollPosition > 350) {
      this.showScrollTop = true;
    } else {
      this.showScrollTop = false;
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  constructor(private elementRef: ElementRef, private renderer: Renderer2,private title: Title, private meta: Meta) { }

  ngAfterViewInit() {
    console.log(this.navbarContent);
    AOS.init();

    const navbar = this.elementRef.nativeElement.querySelector('#navbar');
    const dropdownToggle = this.elementRef.nativeElement.querySelector('.megamenu .dropdown-toggle');
    const dropdownMenu = this.elementRef.nativeElement.querySelector('.megamenu .dropdown-menu');

    const navbarToggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
    const navbarCollapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');

    this.renderer.listen(dropdownToggle, 'click', () => {
      if (dropdownMenu.classList.contains('show')) {
        this.resetNavbarBackground(navbar);
      } else {
        this.toggleNavbarBackground(navbar);
      }
    });

    this.renderer.listen(navbarToggler, 'click', () => {
      if (navbarCollapse.classList.contains('show')) {
        this.resetNavbarBackground(navbar);
      } else {
        this.toggleNavbarBackground(navbar);
      }
    });

    const navbarContent = this.elementRef.nativeElement.querySelector('#navbarContent');
    const navlink = this.elementRef.nativeElement.querySelector('.dropdown-menu .nav-link');

    this.renderer.listen(navlink, 'click', () => {
      if (navlink.classList.contains('show')) {
        this.resetNavbarBackground(navbar);
      } else {
        this.toggleNavbarBackground(navbar);
      }
    });
    
  }

  toggleNavbarBackground(navbar: HTMLElement) {
    this.renderer.addClass(navbar, 'navbar-black');
  }

  resetNavbarBackground(navbar: HTMLElement) {
    this.renderer.removeClass(navbar, 'navbar-black');
  }

  closeNavbar() {
    const navbar = this.navbarContent.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show'); // Remove the 'show' class to collapse the navbar
    }
  }

}
