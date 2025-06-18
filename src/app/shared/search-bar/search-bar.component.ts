import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  jobTitle: string = 'Senior UI/UX Designer';
  location: string = 'New York';
}
