import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { FormValidators } from '../../utils/form.validators';
import { NgIf } from '@angular/common';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-sign-up',
  imports: [InputFieldComponent, RouterLink, FormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  // injecting the service
  private userService = inject(UserService);
  private router = inject(Router);

  @Output() notification = new EventEmitter();

  formValidators = FormValidators;
  showOverlay = false;
  // for role
  form = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'APPLICANT',
  };

  //  for form errors
  formError = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  };

  validatePassword(value: any) {
    this.formError.password = this.formValidators.validateField(
      'password',
      value,
      {
        confirmPassword: this.form.confirmPassword,
      }
    );

    if (this.formError.password === 'Password do not match') {
      this.formError.confirmPassword = this.formError.password;
      this.formError.password = '';
    } else {
      this.formError.confirmPassword = '';
    }
  }

  onSubmit() {
    // console.log(this.form.name);

    // check if formError contains any error messages

    if (this.isFormInvalid()) {
      console.warn('Form is incomplete or has errors');
      return;
    }

    // console.log('Form Submitted:', this.form);
    const { confirmPassword, ...dataToSend } = this.form;
    this.userService.registerUser(dataToSend).subscribe({
      next: (res) => {
        this.showOverlay = true;
        // show success notification
        this.notification.emit({
          title: 'Registered Successfully',
          message: 'Redirecting to login page....',
          type: 'success',
          show: true,
        });

        // clear the form (note this does shallow copy !)
        Object.assign(this.form, {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'APPLICANT',
        });

        // redirect to login page
        setTimeout(() => {
          this.showOverlay = false;
          this.router.navigate(['/login'], {
            replaceUrl: true,
          });
        }, 3000);
      },
      error: (err) => {
        this.showOverlay = false;
        this.notification.emit({
          title: 'Registration failed',
          message: err.error.errorMessage,
          type: 'error',
          show: true,
        });

        throw err;
      },
    });
    // call API
  }

  // for button disable
  isFormInvalid(): boolean {
    return (
      Object.values(this.form).some((v) => !v || v.trim?.() === '') ||
      Object.values(this.formError).some((e) => !!e)
    );
  }
}
