import { Component, input } from '@angular/core';
import { TalentCardComponent } from '../talent-card/talent-card.component';
import { talents } from '../../Data/TalentData';

@Component({
  selector: 'app-talents-list',
  imports: [TalentCardComponent],
  templateUrl: './talents-list.component.html',
  styleUrl: './talents-list.component.css',
})
export class TalentsListComponent {
  talentsData = talents;

  // for posted-jobs section
  posted = input<boolean>(false);
  invited = input<boolean>(false);
}
