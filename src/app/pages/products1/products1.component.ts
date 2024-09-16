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
  selector: 'app-products1',
  templateUrl: './products1.component.html',
  styleUrls: ['./products1.component.css']
})
export class Products1Component {
  @ViewChild('swiperContainer1') swiperContainer1: any = ElementRef;
  @ViewChild('swiperContainer2') swiperContainer2: any = ElementRef;

  ngAfterViewInit() {
  
    let swiper1 = new Swiper(this.swiperContainer1.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 200,
      autoplay: {
        delay: 6000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });

    swiper1.on('slideChange', function () {});

    let swiper2 = new Swiper(this.swiperContainer2.nativeElement, {
      slidesPerView: 1,
      loop: true,
      speed: 300,
      autoplay: {
        delay: 6000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });

    swiper2.on('slideChange', function () {});
  }

}
