import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FeedbackComponent,
  },
];

/** Feedback module. */
@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class FeedbackModule { }
