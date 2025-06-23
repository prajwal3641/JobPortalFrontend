import { Component } from '@angular/core';
import { DropdownSearchInputComponent } from '../shared/dropdown-search-input/dropdown-search-input.component';
import { fields } from '../Data/PostJob';
import { TagsInputComponent } from '../shared/tags-input/tags-input.component';
import { JobDescriptionComponent } from './job-description/job-description.component';

@Component({
  selector: 'app-post-job',
  imports: [
    DropdownSearchInputComponent,
    TagsInputComponent,
    JobDescriptionComponent,
  ],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent {
  dropDownSearchData = fields;
}
