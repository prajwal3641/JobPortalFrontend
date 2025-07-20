import {
  Component,
  ElementRef,
  input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { PostedJobCardComponent } from '../posted-job-card/posted-job-card.component';
import { Job, JobStatus } from '../../post-job/post-job.component';
import { Store } from '@ngrx/store';
import { JobService } from '../../Services/job.service';
import { take, withLatestFrom } from 'rxjs';
import { selectProfile } from '../../state/user/user.feature';
import { selectProfileData } from '../../state/profile/profile.feature';
import { PostedJobService } from '../../Services/posted-job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-active-jobs',
  imports: [PostedJobCardComponent],
  templateUrl: './active-jobs.component.html',
  styleUrl: './active-jobs.component.css',
})
export class ActiveJobsComponent {
  jobsData: Job[] = [];
  constructor(
    private postedJobService: PostedJobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log('Active Jobs Component Initialized', this.id(), this.active());
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.id = id ? Number(id) : 0;

      // console.log('Active Jobs Component ID:', this.id);
    });
  }

  @ViewChildren('jobCard') jobCards!: QueryList<ElementRef>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.id = id ? Number(id) : 0;

      // Wait for Angular to finish rendering the view
      setTimeout(() => {
        const target = document.getElementById('job-' + this.id);
        const container = this.scrollContainer?.nativeElement;

        if (target && container) {
          const targetOffset = target.offsetTop - container.offsetTop;
          const scrollPosition =
            targetOffset - container.clientHeight / 2 + target.clientHeight / 2;

          container.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
      // slight delay helps view render
    });
  }

  active = input<boolean>(true);
  id!: number;

  get getJobs() {
    this.jobsData = this.postedJobService.jobs();
    if (this.active()) {
      return this.jobsData.filter((job) => job.status === JobStatus.OPEN);
    } else {
      return this.jobsData.filter((job) => job.status === JobStatus.DRAFT);
    }
    return [];
  }
}
