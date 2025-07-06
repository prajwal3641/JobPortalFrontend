import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { FormValidators } from '../../utils/form.validators';
import { NgIf } from '@angular/common';
import { ResetPasswordComponent } from '../../signup-login/reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  imports: [InputFieldComponent, RouterLink, NgIf, ResetPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  private router = inject(Router);

  @Output() notification = new EventEmitter();

  form = {
    email: '',
    password: '',
  };

  formError = {
    email: '',
    password: '',
  };

  // for reset password
  resetPassword = false;

  onSubmit() {
    if (this.isFormInvalid()) {
      // this.formError.email = '';
      return;
    }
    if (this.form.email && this.form.password) {
      this.userService.loginUser(this.form).subscribe({
        next: (res) => {
          // show success notification
          this.notification.emit({
            title: 'Login Successfull',
            message: 'Redirecting to home page....',
            type: 'success',
            show: true,
          });

          // clear the form (note this does shallow copy !)
          Object.assign(this.form, {
            email: '',
            password: '',
          });

          // redirect to login page
          setTimeout(() => {
            this.router.navigate(['/'], {
              replaceUrl: true,
            });
          }, 3300);
        },
        error: (err) => {
          this.notification.emit({
            title: 'Login failed',
            message: err.error.errorMessage,
            type: 'error',
            show: true,
          });
          throw err;
        },
      });
    }
  }

  isFormInvalid(): boolean {
    return (
      Object.values(this.form).some((v) => !v || v.trim?.() === '') ||
      Object.values(this.formError).some((e) => !!e)
    );
  }

  toggleResetPassword() {
    this.resetPassword = !this.resetPassword;
  }
}
