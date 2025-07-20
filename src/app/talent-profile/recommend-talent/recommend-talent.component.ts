import { Component, input } from '@angular/core';
import { talents } from '../../Data/TalentData';
import { TalentCardComponent } from '../../find-talent/talent-card/talent-card.component';
import { TalentProfile } from '../profile/profile.model';
import { Talent } from '../../find-talent/talent-card/talent.model';
import { Profile } from '../../state/profile/profile.feature';
import { TCardsComponent } from '../../find-talent/t-cards/t-cards.component';

@Component({
  selector: 'app-recommend-talent',
  imports: [TCardsComponent],
  templateUrl: './recommend-talent.component.html',
  styleUrl: './recommend-talent.component.css',
})
export class RecommendTalentComponent {
  recommended = input.required<Profile[]>();
}
