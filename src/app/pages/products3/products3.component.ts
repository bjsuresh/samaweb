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
  selector: 'app-products3',
  templateUrl: './products3.component.html',
  styleUrls: ['./products3.component.css']
})
export class Products3Component {
  @ViewChild('swiperContainer1') swiperContainer1: any = ElementRef;

  ngAfterViewInit() {
  
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
  }

}
