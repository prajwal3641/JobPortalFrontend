import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  min = signal(20);
  max = signal(80);
  minLimit = 0;
  maxLimit = 100;

  onMinChange(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    if (val <= this.max()) this.min.set(val);
  }

  onMaxChange(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    if (val >= this.min()) this.max.set(val);
  }
}
