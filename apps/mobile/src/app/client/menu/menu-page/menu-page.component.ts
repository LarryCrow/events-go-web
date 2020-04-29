import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'egom-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
  }

}
