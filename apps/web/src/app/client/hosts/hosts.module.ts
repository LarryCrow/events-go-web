import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonSharedModule } from '@ego/common/shared/shared.module';
import { SharedModule } from '@ego/web/app/shared/shared.module';

import { HostFeedbackComponent } from './host-feedback/host-feedback.component';
import { HostPageComponent } from './host-page/host-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: HostPageComponent,
  },
  {
    path: ':id/feedback',
    component: HostFeedbackComponent,
  },
];

/**
 * Hosts module.
 */
@NgModule({
  declarations: [HostPageComponent, HostFeedbackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonSharedModule,
  ],
})
export class HostsModule { }
