import { Component } from '@angular/core';
import { JobHistoryComponent } from './job-history/job-history.component';

@Component({
  selector: 'app-job-history-page',
  imports: [JobHistoryComponent],
  templateUrl: './job-history-page.component.html',
  styleUrl: './job-history-page.component.css',
})
export class JobHistoryPageComponent {}
