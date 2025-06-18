import { Component, signal } from '@angular/core';
import { similar } from '../../Data/Company';

@Component({
  selector: 'app-company-list',
  imports: [],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
})
export class CompanyListComponent {
  companies = similar;
}
