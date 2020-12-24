import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.el.nativeElement.style.color = "#e35e6b";
  }

}
