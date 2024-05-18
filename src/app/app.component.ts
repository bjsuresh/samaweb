import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'samamp_web';
  loaderVisible: boolean = true;
  showScrollTop: boolean = false;
  @ViewChild('#navbarContent') navbarContent:any = ElementRef;

  activeIndex: number = -1;

  setActive(index: number): void {
    this.activeIndex = index;
    localStorage.setItem("activeIndex",this.activeIndex.toString());
  }
  
  ngOnInit() {
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


  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {

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
    
  }

}
