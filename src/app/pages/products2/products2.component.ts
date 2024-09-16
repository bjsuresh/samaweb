import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-products2',
  templateUrl: './products2.component.html',
  styleUrls: ['./products2.component.css']
})
export class Products2Component {
  @ViewChild('swiperContainer1') swiperContainer1: any = ElementRef;
  @ViewChild('swiperContainer') swiperContainer: any = ElementRef;
  @ViewChild('swiperContainer2') swiperContainer2: any = ElementRef;
  @ViewChild('swiperContainer4') swiperContainer4: any = ElementRef;

  ngAfterViewInit() {
    let swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 200,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });

    swiper.on('slideChange', function () {});
    
    let swiper1 = new Swiper(this.swiperContainer1.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 200,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });

    swiper1.on('slideChange', function () {});

    let swiper2 = new Swiper(this.swiperContainer2.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 200,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });

    swiper2.on('slideChange', function () {});

    let swiper4 = new Swiper(this.swiperContainer4.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 200,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });

    swiper4.on('slideChange', function () {});
  }
}
