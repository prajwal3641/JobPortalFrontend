import { Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './slider.component.html',
})
export class SliderComponent {
  minLimit = 0;
  maxLimit = 100;

  min = signal(20);
  max = signal(80);

  onMinChange(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    if (val <= this.max()) {
      this.min.set(val);
    }
  }

  onMaxChange(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    if (val >= this.min()) {
      this.max.set(val);
    }
  }
}
