import { Component } from '@angular/core';
import { MultiInputSearchingComponent } from '../shared/multi-input-searching/multi-input-searching.component';
import { dropdownData } from '../Data/JobsData';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../shared/slider/slider.component';
import { JobsComponent } from './jobs/jobs.component';

@Component({
  selector: 'app-find-jobs',
  imports: [MultiInputSearchingComponent, SliderComponent, JobsComponent],
  templateUrl: './find-jobs.component.html',
  styleUrl: './find-jobs.component.css',
})
export class FindJobsComponent {
  dropDownData = dropdownData;
  minValue: number = 20;
  maxValue: number = 80;
}
