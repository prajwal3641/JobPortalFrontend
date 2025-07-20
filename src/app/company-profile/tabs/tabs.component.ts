import { Component, Input, Type, computed, input, signal } from '@angular/core';
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

  ngOnInit() {
    // console.log('Tabs Component Initialized');
    // console.log('Titles:', this.titles);
    // console.log('Components:', this.components);
    // console.log('Component Inputs:', this.componentInputs);
    this.setTab(this.activeTabIndex());
    // console.log('Active Tab Index:', this.activeTabIndex);
  }

  @Input() set activeTabIndexInput(value: number) {
    this.activeTabIndex.set(value);
  }
  activeTabIndex = signal(0);
  activeTab = computed(() => this.activeTabIndex());

  setTab(index: number) {
    this.activeTabIndex.set(index);
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
