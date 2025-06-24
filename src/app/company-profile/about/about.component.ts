import { Component } from '@angular/core';
import { companyData } from '../../Data/Company';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [NgIf],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  Object = Object;
  aboutData = companyData;
}
