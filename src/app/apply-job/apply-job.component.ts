import { Component, signal } from '@angular/core';
import { DropdownSearchInputComponent } from '../shared/dropdown-search-input/dropdown-search-input.component';
import { Router, RouterLink } from '@angular/router';
import { InputFieldComponent } from '../shared/input-field/input-field.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { NotificationComponent } from '../shared/notification/notification.component';

@Component({
  selector: 'app-apply-job',
  imports: [RouterLink, InputFieldComponent, NotificationComponent],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css',
})
export class ApplyJobComponent {
  preview = signal<boolean>(false);
  submit = signal<boolean>(false);
  time = 5;
  showOverlay = signal<boolean>(false);

  constructor(private router: Router) {}

  togglePreview() {
    this.preview.set(!this.preview());
    // handling the windows scroll up whenever toggle for edit or preview
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleSubmit() {
    // submit logic
    this.submit.set(true);
    this.showOverlay.set(true);

    const interval = setInterval(() => {
      this.time--;
    }, 1000);

    setTimeout(() => {
      this.submit.set(false);
      clearInterval(interval);
      this.showOverlay.set(false);
      // navigate to other page
      this.router.navigate(['/find-jobs']);
    }, 5000);
  }
}
