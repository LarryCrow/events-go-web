import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'egom-my-events-page',
  templateUrl: './my-events-page.component.html',
  styleUrls: ['./my-events-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyEventsPageComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
  }

}
