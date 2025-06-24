import { Component } from '@angular/core';
import { TalentCardComponent } from '../../find-talent/talent-card/talent-card.component';
import { similar } from '../../Data/Company';
import { CompanyCardComponent } from '../company-card/company-card.component';

@Component({
  selector: 'app-recommended-companies',
  imports: [TalentCardComponent, CompanyCardComponent],
  templateUrl: './recommended-companies.component.html',
  styleUrl: './recommended-companies.component.css',
})
export class RecommendedCompaniesComponent {
  recommended = similar;
}
