import { Component, Input } from '@angular/core';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay.component';
import { Profile } from '../../state/profile/profile.feature';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-t-cards',
  imports: [LoadingOverlayComponent, NgIf, RouterLink],
  templateUrl: './t-cards.component.html',
  styleUrl: './t-cards.component.css',
})
export class TCardsComponent {
  @Input() profile!: Profile;

  // for save
  isLiked = false;

  toggleHeart() {
    this.isLiked = !this.isLiked;
  }
}
