import { Component } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputFieldComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
