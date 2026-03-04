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

  activeReporter = -1;
  showDetail = false;

  setReporter(n: number) {
    this.activeReporter = n;
    this.showDetail = true;
  }

  hideDetail() {
    this.showDetail = false;
  }

  showVideoPopup = false;
  currentVideoSrc = '';

  openVideo(src: string) {
    this.currentVideoSrc = src;
    this.showVideoPopup = true;
    document.body.style.overflow = 'hidden';
  }

  closeVideo() {
    this.showVideoPopup = false;
    this.currentVideoSrc = '';
    document.body.style.overflow = '';
  }

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
