import { Component } from '@angular/core';
import { work } from '../../Data/Data';
@Component({
  selector: 'app-working',
  imports: [],
  templateUrl: './working.component.html',
  styleUrl: './working.component.css',
})
export class WorkingComponent {
  workData = work;
}
