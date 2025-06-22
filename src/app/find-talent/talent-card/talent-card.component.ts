import { Component, input } from '@angular/core';
import { Talent } from './talent.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-talent-card',
  imports: [RouterLink],
  templateUrl: './talent-card.component.html',
  styleUrl: './talent-card.component.css',
})
export class TalentCardComponent {
  talent = input.required<Talent>();

  isLiked = false;

  toggleHeart() {
    this.isLiked = !this.isLiked;
  }
}
