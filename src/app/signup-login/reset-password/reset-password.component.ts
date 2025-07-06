import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { FormValidators } from '../../utils/form.validators';

@Component({
  selector: 'app-reset-password',
  imports: [NgIf, InputFieldComponent, FormsModule, NotificationComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  email: string = '';
  password: string = '';
  sentOtp: boolean = false;
  otpSending: boolean = false;
  verified: boolean = false;
  error: string = '';
  resendTimer = 30;
  changingPassword: boolean = false;

  notification: {
    title: string;
    message: string;
    type: 'success' | 'error';
    show: boolean;
    time?: number;
  } = {
    title: '',
    message: '',
    show: false,
    type: 'success',
    time: 0,
  };

  // form errors
  formError = {
    email: '',
    password: '',
  };

  formValidators = FormValidators;

  constructor(private userService: UserService) {}
  // close modal input output 2 way binding
  @Input() resetPassword = true;
  @Output() resetPasswordChange = new EventEmitter<boolean>();

  // otp input logic
  otp: string[] = ['', '', '', '', '', ''];
  otpArray = Array.from({ length: 6 });

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value;
    const value = raw.replace(/[^0-9]/g, '');

    // Force the cleaned numeric value back into the input field
    input.value = value;

    this.otp[index] = value;

    // If user types a digit and it's valid, move to next box
    const next = input.nextElementSibling as HTMLInputElement | null;
    if (value && next) next.focus();
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const key = event.key;

    if (key === 'Backspace' && !input.value && index > 0) {
      const prev = input.previousElementSibling as HTMLInputElement;
      prev?.focus();
    }

    if (key === 'ArrowLeft') {
      const prev = input.previousElementSibling as HTMLInputElement;
      prev?.focus();
    }

    if (key === 'ArrowRight') {
      const next = input.nextElementSibling as HTMLInputElement;
      next?.focus();
    }
  }

  // send otp
  sendOtp() {
    // to handle resend otp and change email , the previous typed otp is remaining so clear it

    this.otp = this.otp.map((ele) => '');
    // console.log(this.otp);
    // this.error = '';

    // every time send otp or resend otp , make the timer 30
    this.resendTimer = 2;

    this.otpSending = true;
    this.userService.sendOtp(this.email).subscribe({
      next: (res) => {
        this.sentOtp = true;
        this.otpSending = false;
        // show notification
        this.triggerNotification(
          'OTP sent succesfully',
          'Verify OTP to change password',
          'success'
        );

        const interval = setInterval(() => {
          this.resendTimer--;
          if (this.resendTimer === 0) {
            clearInterval(interval);
          }
        }, 1000);
      },
      error: (err) => {
        this.otpSending = false;
        console.log('error aya');
        // show notification

        this.triggerNotification(
          'Error sending OTP',
          err.error.errorMessage,
          'error'
        );
      },
    });
  }

  // resend otp (no need !, hadnled in the sendOtp function only )
  reSendOtp() {
    // to handle resend otp and change email , the previous typed otp is remaining so clear it
    this.otp = this.otp.map((ele) => '');
    this.sentOtp = false;
    this.otpSending = true;
    this.userService.sendOtp(this.email).subscribe({
      next: (res) => {
        this.sentOtp = true;
        this.otpSending = false;
        // show notification
        this.triggerNotification(
          'OTP Re-sent succesfully',
          'Verify OTP to change password',
          'success'
        );

        const interval = setInterval(() => {
          this.resendTimer--;
          if (this.resendTimer === 0) {
            clearInterval(interval);
            this.resendTimer = 30;
          }
        }, 1000);
      },
      error: (err) => {
        this.triggerNotification(
          'Error Re-sending OTP',
          err.error.errorMessage,
          'error'
        );
      },
    });
  }

  // verify otp
  verifyingOtp: boolean = false;

  verifyOtp() {
    this.error = '';
    const otpValue = this.otp.join('');

    if (otpValue.length !== 6 || this.verifyingOtp) return;

    this.verifyingOtp = true;

    // console.log(otpValue);

    this.userService.verifyOtp(this.email, otpValue).subscribe({
      next: (res) => {
        // console.log('OTP Verified:', res);
        this.verifyingOtp = false;
        this.sentOtp = false;
        this.verified = true;
        // show notification
        this.triggerNotification(
          'OTP verified succesfully',
          'Enter new password',
          'success'
        );
      },
      error: (err) => {
        // console.error('Invalid OTP', err);
        // this.verifyingOtp = false;
        // show some error !!!!
        this.verifyingOtp = false;
        this.error = err.error.errorMessage;
        this.triggerNotification(
          'Error verifying OTP',
          err.error.errorMessage,
          'error'
        );
      },
    });
  }

  // change email
  changeEmail() {
    this.email = '';
    this.sentOtp = false;
  }

  changePassword() {
    this.changingPassword = true;
    setTimeout(() => {
      this.userService.changePassword(this.email, this.password).subscribe({
        next: (res) => {
          this.changingPassword = false;
          console.log(res);
          // show notification
          this.triggerNotification(
            'Password changes succesfully',
            'Returning to login page',
            'success'
          );
          setTimeout(() => {
            this.resetPasswordChange.emit(false);
          }, 2000);
        },
        error: (err) => {
          this.error = err.error.errorMessage;
          this.triggerNotification(
            'Error Changing Password',
            err.error.errorMessage,
            'error'
          );
        },
      });
    }, 2000);
  }

  // for notifica tion
  triggerNotification(
    title: string,
    message: string,
    type: 'success' | 'error',
    time = 3000
  ) {
    // Hide it first to reset state (important for same repeated errors)
    this.notification.show = false;

    // Wait a bit and then trigger new one
    setTimeout(() => {
      this.notification = {
        title,
        message,
        type,
        time,
        show: true,
      };
    }, 10); // ⏱️ gives Angular time to detect the transition
  }
}
