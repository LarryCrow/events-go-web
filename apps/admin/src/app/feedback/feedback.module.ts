import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { CommonSharedModule } from '@ego/common/shared/shared.module';

import { FeedbackComponent } from './feedback/feedback.component';
import { HandleFeedbackComponent } from './handle-feedback/handle-feedback.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FeedbackComponent,
  },
  { path: ':id', component: HandleFeedbackComponent },
];

/** Feedback module. */
@NgModule({
  declarations: [FeedbackComponent, HandleFeedbackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    CommonSharedModule,
  ],
})
export class FeedbackModule { }
