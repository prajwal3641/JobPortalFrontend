import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  standalone: true,
  imports: [NgClass, NgIf],
})
export class NotificationComponent implements OnChanges {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success'; // controls icon & text color
  @Input() show: boolean = false;

  @Input() time?: number; // optional time in milliseconds

  private timeoutId: any;

  @Output() showChange = new EventEmitter<boolean>(); // 2-way binding compatible

  ngOnInit() {
    // setTimeout(() => {
    //   this.show = false;
    // }, 2000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && this.show) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.show = false;
        this.showChange.emit(false); // trigger parent to hide
      }, this.time || 3000); // ← 3 seconds fixed
    }
  }

  closeNotification() {
    clearTimeout(this.timeoutId);
    this.show = false;
    // this.showChange.emit(false); // manual close
  }
}
