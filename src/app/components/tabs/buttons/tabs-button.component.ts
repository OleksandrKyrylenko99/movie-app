import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabsButton } from '../../../types/tybs-button';

@Component({
  selector: 'app-tabs-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tabs-button.component.html',
  styleUrl: './tabs-button.component.scss',
})
export class TabsButtonComponent {
  @Input() tabsButton: TabsButton[] = [];
  @Output() onTabChange = new EventEmitter();
  activatedTab = 'movie';
  setTab(type: string) {
    this.activatedTab = type;
    this.onTabChange.emit(this.activatedTab);
  }
}
