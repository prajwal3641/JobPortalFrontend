import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  imports: [RouterLink],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css',
})
export class CompanyProfileComponent {
  constructor(public location: Location) {}
  goBackWithFallback(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // this.router.navigate(['/fallback']);
      console.log('No previous page');
    }
  }
}
