import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Main tabs for the application */
@Component({
  selector: 'egom-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent { }
