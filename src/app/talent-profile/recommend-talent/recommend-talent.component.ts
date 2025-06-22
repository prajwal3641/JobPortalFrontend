import { Component } from '@angular/core';
import { talents } from '../../Data/TalentData';
import { TalentCardComponent } from '../../find-talent/talent-card/talent-card.component';

@Component({
  selector: 'app-recommend-talent',
  imports: [TalentCardComponent],
  templateUrl: './recommend-talent.component.html',
  styleUrl: './recommend-talent.component.css',
})
export class RecommendTalentComponent {
  talentsData = talents;
}
