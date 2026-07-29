import { Component, ElementRef, ViewChild } from '@angular/core';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: [
    '../products3/products3.component.css',
    '../products5/products5.component.css',
    './alarm.component.css'
  ]
})
export class AlarmComponent {

  
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


}
