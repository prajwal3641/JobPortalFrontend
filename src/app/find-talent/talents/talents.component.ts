import { Component } from '@angular/core';
import { SortComboboxComponent } from '../../shared/sort-combobox/sort-combobox.component';
import { TalentCardComponent } from '../talent-card/talent-card.component';
import { talents } from '../../Data/TalentData';
import { TalentsListComponent } from '../talents-list/talents-list.component';

@Component({
  selector: 'app-talents',
  imports: [SortComboboxComponent, TalentsListComponent],
  templateUrl: './talents.component.html',
  styleUrl: './talents.component.css',
})
export class TalentsComponent {
  talentsData = talents;
}
