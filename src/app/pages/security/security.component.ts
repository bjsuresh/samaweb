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
  currentVideoPoster = '';
  videoLoading = true;

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

  /** Poster shown until the video has real frames to paint, e.g. assets/images/webclient.mp4 -> assets/images/webclient-poster.jpg */
  private posterFor(src: string): string {
    return src.replace(/\.[^./]+$/, '-poster.jpg');
  }

  openVideo(src: string) {
    this.currentVideoSrc = src;
    this.currentVideoPoster = this.posterFor(src);
    this.videoLoading = true;
    this.showVideoPopup = true;
    document.body.style.overflow = 'hidden';
  }

  closeVideo() {
    this.showVideoPopup = false;
    this.currentVideoSrc = '';
    this.currentVideoPoster = '';
    this.videoLoading = true;
    document.body.style.overflow = '';
  }

  /** Video now has a real frame to show — hide the thumbnail/spinner. */
  onVideoPlaying(): void {
    this.videoLoading = false;
  }

  /** Buffering or re-buffering mid-playback — bring the spinner back so it doesn't look frozen. */
  onVideoWaiting(): void {
    this.videoLoading = true;
  }

  /** Load failed — stop the spinner so it doesn't spin forever. */
  onVideoError(): void {
    this.videoLoading = false;
  }
}
