import { Component } from '@angular/core';
import { TabsComponent } from '../../company-profile/tabs/tabs.component';
import { JobHistoryContainerComponent } from '../job-history-container/job-history-container.component';
import { Job } from '../../post-job/post-job.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { JobService } from '../../Services/job.service';
import { selectProfile } from '../../state/user/user.feature';
import { selectProfileData } from '../../state/profile/profile.feature';
import { take, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-job-history',
  standalone: true,
  imports: [TabsComponent, NgIf],
  templateUrl: './job-history.component.html',
  styleUrl: './job-history.component.css',
})
export class JobHistoryComponent {
  tabComponents = [
    JobHistoryContainerComponent,
    JobHistoryContainerComponent,
    JobHistoryContainerComponent,
    JobHistoryContainerComponent,
  ];

  // Getter so input stays fresh and reactive
  get tabInputs() {
    // console.log('inside the getter');
    return {
      Applied: { applied: true },
      Saved: { saved: true },
      Offered: { offered: true },
      Interviewing: { interviewing: true },
    };
  }
}
