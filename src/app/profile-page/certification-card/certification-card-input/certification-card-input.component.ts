import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldComponent } from '../../../shared/input-field/input-field.component';
import { ProfileInputComponent } from '../../profile-input/profile-input.component';

import fields, { ProfileFeilds } from '../../../Data/Profile';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-certification-card-input',
  imports: [InputFieldComponent, ProfileInputComponent, FormsModule],
  templateUrl: './certification-card-input.component.html',
  styleUrl: './certification-card-input.component.css',
})
export class CertificationCardInputComponent {
  fields: ProfileFeilds[] = fields;

  // issue Date
  issueDate = new Date().toISOString().slice(0, 7);

  // for closing the input , like saving or cancelling
  @Input() addCerti = true;
  @Output() addCertiChange = new EventEmitter<boolean>();

  makeAddCertiFalse() {
    this.addCertiChange.emit(false);
  }
}
