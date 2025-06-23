import { Component, computed, input, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { profiles, talents } from '../Data/TalentData';
import { TalentProfile } from './profile/profile.model';
import { RecommendTalentComponent } from './recommend-talent/recommend-talent.component';
import { Talent } from '../find-talent/talent-card/talent.model';
import { TalentsComponent } from '../find-talent/talents/talents.component';

@Component({
  selector: 'app-talent-profile',
  imports: [RouterLink, ProfileComponent, RecommendTalentComponent],
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css',
})
export class TalentProfileComponent {
  allProfiles = signal<TalentProfile[]>(profiles);
  allTalents = signal<Talent[]>(talents);

  userName = input.required<string>();

  data = computed(() => {
    return this.allProfiles().find(
      (profile) => profile.name === this.userName()
    )!;
  });

  recommended = computed(() => {
    return this.recommendedTalents(this.data, this.allProfiles);
  });

  ngOnInit() {
    // console.log(this.data());
    // console.log(this.recommended);
  }

  recommendedTalents(
    profile: Signal<TalentProfile>,
    profiles: Signal<TalentProfile[]>
  ) {
    const profileScores = profiles()
      .map((p) => {
        if (p.name === profile().name) return;

        let currScore = 0;

        // skills
        const skills = profile().skills.filter((skill) =>
          p.skills.includes(skill)
        ).length;
        currScore += skills * 10;

        //  based on location
        const location = profile().location === p.location ? 1 : 0;
        currScore += location;
        return { p, currScore };
      })
      .filter(
        (item): item is { p: TalentProfile; currScore: number } =>
          item !== undefined
      )
      .sort((a, b) => {
        return b.currScore - a.currScore;
      })
      .map((p) => p.p);

    const recommendedTalent = profileScores.map((profile) => {
      // use t["name"]
      return this.allTalents().find((t) => profile.name === t.name)!;
    });
    // console.log(scores);

    return recommendedTalent.slice(0, 4);
  }
}
