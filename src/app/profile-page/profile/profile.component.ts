import { Component, signal, Signal } from '@angular/core';
import { CertificationCardComponent } from '../../profile-page/certification-card/certification-card.component';
import { ExperienceCardComponent } from '../../profile-page/experience-card/experience-card.component';

import { TalentProfile } from '../../talent-profile/profile/profile.model';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import fields, { ProfileFeilds } from '../../Data/Profile';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { DropdownSearchInputComponent } from '../../shared/dropdown-search-input/dropdown-search-input.component';
import { ProfileInputComponent } from '../profile-input/profile-input.component';
import { FormsModule, NgModel } from '@angular/forms';
import { TagsInputComponent } from '../../shared/tags-input/tags-input.component';
import { ExperienceCardInputComponent } from '../experience-card/experience-card-input/experience-card-input.component';
import { CertificationCardInputComponent } from '../certification-card/certification-card-input/certification-card-input.component';
import { ProfileService } from '../../Services/profile.service';
import { Store } from '@ngrx/store';
import {
  selectProfile,
  UserProfile,
  UserState,
} from '../../state/user/user.feature';
import { UserService } from '../../Services/user.service';
import {
  Profile,
  ProfileActions,
  selectProfileData,
} from '../../state/profile/profile.feature';
import { Observable, take } from 'rxjs';
import { AddExperienceCardComponent } from '../experience-card/add-experience-card/add-experience-card.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-profile',
  imports: [
    CertificationCardComponent,
    ExperienceCardComponent,
    NgClass,
    NgIf,
    FormsModule,
    CommonModule,
    ProfileInputComponent,
    TagsInputComponent,
    CertificationCardInputComponent,
    AddExperienceCardComponent,
    NotificationComponent,
    CarouselModule,
    LoadingOverlayComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  //  connnecting with backend
  constructor(private profileService: ProfileService, private store: Store) {}
  profile$!: Observable<Profile | null>;
  profile!: Profile;
  profileEdit!: Profile;
  showOverlay = false;

  ngOnInit() {
    console.log('Profile component initialized');
    this.showOverlay = true;
    this.profile$ = this.store.select(selectProfileData);
    this.profile$.subscribe((res) => {
      if (res) {
        console.log('Profile data fetched from store:');
        this.profile = structuredClone(res);
        // console.log('Profile data fetched:', this.profile);
        this.profileEdit = structuredClone(res);
        this.showOverlay = false;
      } else {
        console.error('No profile data found in store');
        this.store
          .select(selectProfile)
          .pipe(take(1))
          .subscribe((user) => {
            if (user?.profileId) {
              this.profileService.getProfile(user.profileId).subscribe({
                next: (res) => {
                  this.showOverlay = false;
                  this.profile = structuredClone(res);
                  this.profileEdit = structuredClone(res);
                  this.store.dispatch(
                    ProfileActions.setProfile({ profileObject: res })
                  );
                },
                error: (err) => {
                  this.showOverlay = false;

                  console.error('Failed to fetch profile', err);
                },
              });
            }
          });
      }
    });

    // check
    if (this.profile === undefined) {
      // this.showOverlay = true;
    } else {
      this.showOverlay = false;
    }
  }

  // for notification
  notification: {
    title: string;
    message: string;
    type: 'success' | 'error';
    show: boolean;
    time?: number;
  } = {
    title: '',
    message: '',
    show: false,
    type: 'success',
    time: 0,
  };
  fields: ProfileFeilds[] = fields;

  edit = signal<boolean[]>([false, false, false, false, false]);

  //  for adding new exp section
  addExp = false;
  toggleAddExp() {
    this.addExp = !this.addExp;
  }

  addCerti = false;
  toggleAddCerti() {
    this.addCerti = !this.addCerti;
  }

  handleEdit(index: any) {
    // if any index comes, toggle the value at that index
    this.edit.update((arr) => {
      const newArr = [...arr];
      newArr[index] = !newArr[index];
      return newArr;
    });
  }

  onCancelEdit() {
    // reset the profileEdit to original profile
    this.profileEdit = structuredClone(this.profile);
    // this.edit.set([false, false, false, false, false]);
  }
  saveSection(section = '') {
    // check if the profile is really updated or not
    let profiledChanged = false;

    // const profileTemp = structuredClone(this.profile);

    if (JSON.stringify(this.profileEdit) !== JSON.stringify(this.profile)) {
      // this.profile = structuredClone(this.profileEdit);
      profiledChanged = true;
    }

    if (profiledChanged) {
      // console.log('hiijh');
      this.showOverlay = true;
      this.profileService.updateProfile(this.profileEdit).subscribe({
        next: (res) => {
          this.showOverlay = false;
          // or upated res
          this.profile = structuredClone(this.profileEdit);

          this.store.dispatch(
            ProfileActions.setProfile({ profileObject: res })
          );
          this.triggerNotification(
            `${section} section updated`,
            '',
            'success',
            2000
          );
          // this.handleEdit(index); // close edit mode
        },
        error: (err) => {
          this.showOverlay = false;
          this.triggerNotification(
            `${section} section update failed`,
            err.error?.errorMessage || 'Unknown error occurred',
            'error',
            2000
          );
          // rollback to original profile
          // this.profile = structuredClone(profileTemp);
          // this.profileEdit = structuredClone(profileTemp);
          this.profileEdit = structuredClone(this.profile);
        },
      });
    }
  }

  deleteExperience(id: number) {
    this.profileEdit.experience = this.profileEdit.experience.filter(
      (exp) => exp.id !== id
    );
    this.saveSection('Experience Deleted');
  }

  deleteCertification(id: number) {
    // delete from profile
    this.profileEdit.certification = this.profileEdit.certification.filter(
      (cer) => cer.id !== id
    );
    this.saveSection('Certification Deleted');
  }

  // for notification
  triggerNotification(
    title: string,
    message: string,
    type: 'success' | 'error',
    time = 3000
  ) {
    // Hide it first to reset state (important for same repeated errors)
    this.notification.show = false;

    // Wait a bit and then trigger new one
    setTimeout(() => {
      this.notification = {
        title,
        message,
        type,
        time,
        show: true,
      };
    }, 10); // ⏱️ gives Angular time to detect the transition
  }

  profileImageUrl: string | null = null;

  onProfileImageSelected(event: Event) {
    this.showOverlay = true;
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();

      // asynch operation calls after readAsDataURL only
      reader.onload = () => {
        const base64 = reader.result as string;

        // remove prefix like "data:image/jpeg;base64," if needed
        const cleanBase64 = base64.split(',')[1];

        // update profile object with image string
        this.profileEdit.profileImage = cleanBase64;

        // now call updateProfile API
        this.profileService.updateProfile(this.profileEdit).subscribe({
          next: (updatedProfile) => {
            this.showOverlay = false;
            this.profile = structuredClone(this.profileEdit);
            this.store.dispatch(
              ProfileActions.setProfile({ profileObject: updatedProfile })
            );
            this.triggerNotification('Profile image updated', '', 'success');
          },
          error: (err) => {
            this.showOverlay = false;
            this.profileEdit = structuredClone(this.profile); // rollback changes
            this.triggerNotification('Upload failed', '', 'error');
          },
        });
      };

      // this runs first
      // then after reader.onload is called
      reader.readAsDataURL(file); // get base64 string
    }
  }
}
