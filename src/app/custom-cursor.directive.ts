import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '.custom-cursor' // Select the element with class "custom-cursor"
})
export class CustomCursorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Update the position of the cursor image
    this.el.nativeElement.style.left = `${event.pageX}px`;
    this.el.nativeElement.style.top = `${event.pageY}px`;
  }
}
