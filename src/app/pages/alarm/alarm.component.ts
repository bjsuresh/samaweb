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
  
    /** Size the popup frame to the video's true aspect ratio so it never stretches or letterboxes. */
    fitVideoFrame(video: HTMLVideoElement, frame: HTMLElement): void {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        frame.style.setProperty('--vp-ratio', String(video.videoWidth / video.videoHeight));
      }
    }

    private prefetched = new Set<string>();

    prefetch(src: string): void {
      if (this.prefetched.has(src)) { return; }
      this.prefetched.add(src);
      const link = document.createElement('link');
      link.rel = 'prefetch';       // use 'preload' + as='video' for the hero clip only
      link.href = src;
      document.head.appendChild(link);
    }

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
