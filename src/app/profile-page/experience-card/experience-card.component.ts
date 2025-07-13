import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { ExperienceCardInputComponent } from './experience-card-input/experience-card-input.component';
import { Experience } from '../../state/profile/profile.feature';
import fields from '../../Data/Profile';

@Component({
  selector: 'app-experience-card',
  imports: [NgIf, ExperienceCardInputComponent, DatePipe],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
  @Output() experienceChange = new EventEmitter();

  @Output() deleteIt = new EventEmitter<number>();

  // taking input for edit or delete
  edit = input<boolean>(false);

  // for makeing the exp input card close !!
  ngOnChanges(changes: SimpleChanges) {
    if (changes['edit']) {
      if (!this.edit()) {
        this.canEdit = false;
      }
    }
  }

  // state for showing the edit
  canEdit: boolean = false;

  // save the experience

  toggleEdit() {
    this.canEdit = !this.canEdit;
  }

  onEditSaveKaro(flag: boolean) {
    // console.log(this.experience.description);
    this.experienceChange.emit(this.experience);
  }

  onDeleteExperience() {
    this.deleteIt.emit(this.experience.id);
  }
}
