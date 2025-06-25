import { Component, Input, Type, computed, signal } from '@angular/core';
import { NgComponentOutlet, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  imports: [NgComponentOutlet, NgClass, NgFor],
})
export class TabsComponent {
  @Input() titles: string[] = [];
  @Input() components: Type<any>[] = [];

  // ✅ Optional component inputs: { about: {...}, jobs: {...} }
  @Input() componentInputs: Record<string, any> = {};

  activeTab = signal(0);

  setTab(index: number) {
    this.activeTab.set(index);
  }

  formatTitle(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  readonly activeComponent = computed(() => this.components[this.activeTab()]);
  readonly activeInputs = computed(() => {
    const key = this.titles[this.activeTab()];
    return this.componentInputs?.[key] ?? {};
  });
}
