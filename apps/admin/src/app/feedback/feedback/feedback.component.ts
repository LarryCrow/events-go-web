import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'egoa-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
