import { Component, computed, input, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

import { RecommendTalentComponent } from './recommend-talent/recommend-talent.component';

import { ProfileService } from '../Services/profile.service';
import { Profile } from '../state/profile/profile.feature';
import { Location } from '@angular/common';

@Component({
  selector: 'app-talent-profile',
  imports: [RouterLink, ProfileComponent, RecommendTalentComponent],
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css',
})
export class TalentProfileComponent {
  allProfiles = signal<Profile[]>([]);

  profile!: Profile;
  id = input.required<number>();

  // data = computed(() => {
  //   return this.allProfiles().find(
  //     (profile) => profile.name === this.userName()
  //   )!;
  // });

  // recommended = computed(() => {
  //   return this.recommendedTalents(this.data, this.allProfiles);
  // });

  constructor(
    private profileService: ProfileService,
    private location: Location
  ) {}

  ngOnChanges() {
    this.profileService.getProfile(this.id()).subscribe({
      next: (profileData) => {
        this.profile = profileData;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      },
    });
    this.profileService.getAllProfiles().subscribe({
      next: (profiles) => {
        this.allProfiles.set(profiles);
      },
      error: (error) => {
        console.error('Error fetching all profiles:', error);
      },
    });
  }

  // recommendedTalents(
  //   profile: Signal<TalentProfile>,
  //   profiles: Signal<TalentProfile[]>
  // ) {
  //   const profileScores = profiles()
  //     .map((p) => {
  //       if (p.name === profile().name) return;

  //       let currScore = 0;

  //       // skills
  //       const skills = profile().skills.filter((skill) =>
  //         p.skills.includes(skill)
  //       ).length;
  //       currScore += skills * 10;

  //       //  based on location
  //       const location = profile().location === p.location ? 1 : 0;
  //       currScore += location;
  //       return { p, currScore };
  //     })
  //     .filter(
  //       (item): item is { p: TalentProfile; currScore: number } =>
  //         item !== undefined
  //     )
  //     .sort((a, b) => {
  //       return b.currScore - a.currScore;
  //     })
  //     .map((p) => p.p);

  //   const recommendedTalent = profileScores.map((profile) => {
  //     // use t["name"]
  //     return this.allTalents().find((t) => profile.name === t.name)!;
  //   });
  //   // console.log(scores);

  //   return recommendedTalent.slice(0, 4);
  // }

  goBack() {
    this.location.back();
  }
}
