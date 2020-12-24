import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appJumping]'
})
export class JumpingDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.renderer.addClass(this.el.nativeElement, "jumping");
  }

}
