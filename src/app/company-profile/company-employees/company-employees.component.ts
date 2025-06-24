import { Component } from '@angular/core';
import { TalentCardComponent } from '../../find-talent/talent-card/talent-card.component';
import { talents } from '../../Data/TalentData';

@Component({
  selector: 'app-company-employees',
  imports: [TalentCardComponent],
  templateUrl: './company-employees.component.html',
  styleUrl: './company-employees.component.css',
})
export class CompanyEmployeesComponent {
  talentsData = talents;
}
