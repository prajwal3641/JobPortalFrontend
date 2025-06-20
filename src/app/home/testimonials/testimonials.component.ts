import { Component } from '@angular/core';
import { StarRatingComponent } from '../../shared/start-rating/start-rating.component';
import { testimonials } from '../../Data/Data';

@Component({
  selector: 'app-testimonials',
  imports: [StarRatingComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  testimonials = testimonials;
}
