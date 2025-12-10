import { Directive, ElementRef, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appColour]',
  standalone: true
})
export class ColourDirective {
  appColour = 'blue';

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.color = 'green';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.color = this.appColour;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.color = 'red';
  }

}
