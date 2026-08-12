import { Component } from '@angular/core';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: [
    '../products1/products1.component.css',
    './batch.component.css'
  ]
})
export class BatchComponent {
  activeReporter = -1;
  showDetail = false;

  setReporter(n: number) {
    this.activeReporter = n;
    this.showDetail = true;
    document.body.style.overflow = 'hidden';
  }

  hideDetail() {
    this.showDetail = false;
    document.body.style.overflow = '';
  }

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

  /** Poster shown until the video has real frames to paint, e.g. assets/images/Batch_Reporter.mp4 -> assets/images/Batch_Reporter-poster.jpg */
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
    document.body.style.overflow = this.showDetail ? 'hidden' : '';
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
