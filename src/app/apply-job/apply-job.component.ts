import { Component } from '@angular/core';
import { DropdownSearchInputComponent } from '../shared/dropdown-search-input/dropdown-search-input.component';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../shared/input-field/input-field.component';
import { FooterComponent } from '../layouts/footer/footer.component';

@Component({
  selector: 'app-apply-job',
  imports: [RouterLink, InputFieldComponent, FooterComponent],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css',
})
export class ApplyJobComponent {}
