import { Component } from '@angular/core';
import { ProfileComponent } from '../profile-page/profile/profile.component';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {}
