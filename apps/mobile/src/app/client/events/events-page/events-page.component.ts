import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'egom-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
  }

}
