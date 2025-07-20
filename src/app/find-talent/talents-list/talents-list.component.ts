import { Component, input } from '@angular/core';
import { TalentCardComponent } from '../talent-card/talent-card.component';
import { talents } from '../../Data/TalentData';
import { PostedJobService } from '../../Services/posted-job.service';
import { ApplicationStatus } from '../../post-job/post-job.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-talents-list',
  imports: [TalentCardComponent],
  templateUrl: './talents-list.component.html',
  styleUrl: './talents-list.component.css',
})
export class TalentsListComponent {
  talentsData = talents;

  id!: number;

  // for posted-jobs section
  posted = input<boolean>(false);
  invited = input<boolean>(false);
  offered = input<boolean>(false);
  rejected = input<boolean>(false);

  constructor(
    private postedJobService: PostedJobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch the job ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id')) || 0;
    });
  }

  get getTalents(): any {
    if (this.posted()) {
      return this.postedJobService
        .getJobById(this.id)
        ?.applicants.filter(
          (applicant) => applicant.status === ApplicationStatus.APPLIED
        );
    } else if (this.invited()) {
      return this.postedJobService
        .getJobById(this.id)
        ?.applicants.filter(
          (applicant) => applicant.status === ApplicationStatus.INTERVIEWING
        );
    } else if (this.offered()) {
      return this.postedJobService
        .getJobById(this.id)
        ?.applicants.filter(
          (applicant) => applicant.status === ApplicationStatus.OFFERED
        );
    } else if (this.rejected()) {
      return this.postedJobService
        .getJobById(this.id)
        ?.applicants.filter(
          (applicant) => applicant.status === ApplicationStatus.REJECTED
        );
    }
    // return this.talentsData;
    // return this.talentsData.filter((talent) => talent.status === 'active');
  }
}
