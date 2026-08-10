import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  // Reuses the shared product-page styling (tile/body/portal-intro/orbit/feat-panel)
  styleUrls: [
    '../products2/products2.component.css',
    './security.component.css'
  ]
})
export class SecurityComponent {

  showVideoPopup = false;
  currentVideoSrc = '';

  /** Size the popup frame to the video's true aspect ratio so it never stretches or letterboxes. */
  fitVideoFrame(video: HTMLVideoElement, frame: HTMLElement): void {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      frame.style.setProperty('--vp-ratio', String(video.videoWidth / video.videoHeight));
    }
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
