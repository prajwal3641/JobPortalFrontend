import { Component, Input, computed } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './start-rating.component.html',
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() max = 5;

  stars = computed(() => Array.from({ length: this.max }));

  percent = computed(() => `${(this.rating / this.max) * 100}%`);
}
