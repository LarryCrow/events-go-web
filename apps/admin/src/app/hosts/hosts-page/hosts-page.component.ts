import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'egoa-hosts-page',
  templateUrl: './hosts-page.component.html',
  styleUrls: ['./hosts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
