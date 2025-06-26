import { Component } from '@angular/core';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [InputFieldComponent, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {}
