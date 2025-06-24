import { Component, input } from '@angular/core';
import { similar } from '../../Data/Company';

@Component({
  selector: 'app-company-card',
  imports: [],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.css',
})
export class CompanyCardComponent {
  company = input.required<{ name: string; employees: number }>({});

  //  for bookmark icon functionlity
  isBookmarked = false;

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
  }
}
