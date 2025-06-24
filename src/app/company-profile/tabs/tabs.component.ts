import { NgClass, NgComponentOutlet, NgFor } from '@angular/common';
import { Component, Input, Type } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  imports: [NgComponentOutlet, NgClass, NgFor],
})
export class TabsComponent {
  @Input() titles: string[] = [];
  @Input() components: Type<any>[] = [];

  activeTab: number = 0;

  setTab(index: number) {
    this.activeTab = index;
  }

  isActive(index: number): boolean {
    return this.activeTab === index;
  }

  formatTitle(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
}
