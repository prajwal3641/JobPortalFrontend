import { NgIf } from '@angular/common';
import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  imports: [NgIf],
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css'], // optional if using inline styles
})
export class LoadingOverlayComponent {
  @Input() show = false;

  // constructor(private renderer: Renderer2) {}

  // ngOnChanges() {
  //   if (this.show) {
  //     this.renderer.addClass(document.body, 'overflow-hidden');
  //   } else {
  //     this.renderer.removeClass(document.body, 'overflow-hidden');
  //   }
  // }
}
