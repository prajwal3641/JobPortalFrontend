import { Component } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { filter } from 'rxjs';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { NotificationComponent } from '../shared/notification/notification.component';

@Component({
  selector: 'app-signup-login-page',
  imports: [
    SignUpComponent,
    RouterLink,
    LoginComponent,
    NgClass,
    NotificationComponent,
  ],
  templateUrl: './signup-login-page.component.html',
  styleUrl: './signup-login-page.component.css',
})
export class SignupLoginPageComponent {
  // for notification from childs (login and register)
  notification: {
    title: string;
    message: string;
    type: 'success' | 'error';
    show: boolean;
  } = {
    title: '',
    message: '',
    type: 'success',
    show: false,
  };
  urlPath = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))

      .subscribe((event: NavigationEnd) => {
        this.urlPath = event.urlAfterRedirects;
      });
  }

  // show notification
  showNotification(noti: {
    title: string;
    message: string;
    type: 'success' | 'error';
    show: boolean;
  }) {
    this.notification = { ...noti };

    setTimeout(() => {
      this.notification.show = false;
    }, 3000);
  }
}
