import { Component } from '@angular/core';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: [
    '../products1/products1.component.css'
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

  openVideo(src: string) {
    this.currentVideoSrc = src;
    this.showVideoPopup = true;
    document.body.style.overflow = 'hidden';
  }

  closeVideo() {
    this.showVideoPopup = false;
    this.currentVideoSrc = '';
    document.body.style.overflow = this.showDetail ? 'hidden' : '';
  }
}
