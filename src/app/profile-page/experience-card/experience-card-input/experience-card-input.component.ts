import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import fields from '../../../Data/Profile';
import { FormsModule } from '@angular/forms';
import { ProfileInputComponent } from '../../profile-input/profile-input.component';
import { InputFieldComponent } from '../../../shared/input-field/input-field.component';

@Component({
  selector: 'app-experience-card-input',
  imports: [FormsModule, ProfileInputComponent, InputFieldComponent],
  templateUrl: './experience-card-input.component.html',
  styleUrl: './experience-card-input.component.css',
})
export class ExperienceCardInputComponent {
  fields = fields;
  desc = signal<string>(
    'As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process.'
  );

  startDate: string = '2024-06';
  endDate: string = new Date().toISOString().slice(0, 7);

  now = new Date();
  yearMonth = this.now.toISOString().slice(0, 7); // "2025-06"

  maxDate = this.yearMonth;

  disableEndDate = signal<boolean>(false);

  // for two way binding for closing the edit
  @Input() canEdit: boolean = true;
  @Output() canEditChange = new EventEmitter<boolean>();

  // to make the text Add Experience , instead of Edit Experience
  add = input<boolean>(false);

  // for two way binding for closing the add experience input section
  @Input() addExp: boolean = true;
  @Output() addExpChange = new EventEmitter<boolean>();

  constructor() {
    // console.log('insdien');
  }

  makeCanEditFalse() {
    this.canEditChange.emit(false);
  }

  makeAddExpFalse() {
    this.addExpChange.emit(false);
  }
}
