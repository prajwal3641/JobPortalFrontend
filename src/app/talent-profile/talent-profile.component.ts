import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { profile } from '../Data/TalentData';
import { TalentProfile } from './profile/profile.model';
import { RecommendTalentComponent } from './recommend-talent/recommend-talent.component';

@Component({
  selector: 'app-talent-profile',
  imports: [RouterLink, ProfileComponent, RecommendTalentComponent],
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css',
})
export class TalentProfileComponent {
  data: TalentProfile = profile;
}
