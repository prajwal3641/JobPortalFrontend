import { Component } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signup-login-page',
  imports: [SignUpComponent, LoginComponent, NgClass],
  templateUrl: './signup-login-page.component.html',
  styleUrl: './signup-login-page.component.css',
})
export class SignupLoginPageComponent {
  urlPath = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))

      .subscribe((event: NavigationEnd) => {
        this.urlPath = event.urlAfterRedirects;
      });
  }
}
