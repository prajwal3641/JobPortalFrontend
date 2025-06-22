import { Component } from '@angular/core';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { MultiInputSearchingComponent } from '../shared/multi-input-searching/multi-input-searching.component';
import { searchFields } from '../Data/TalentData';
import { SliderComponent } from '../shared/slider/slider.component';
import { TalentsComponent } from './talents/talents.component';

@Component({
  selector: 'app-find-talent',
  imports: [MultiInputSearchingComponent, SliderComponent, TalentsComponent],
  templateUrl: './find-talent.component.html',
  styleUrl: './find-talent.component.css',
})
export class FindTalentComponent {
  dropDownData = searchFields;
}
