import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonSharedModule } from '@ego/common/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { HostFeedbackComponent } from './components/host-feedback/host-feedback.component';
import { HostPopoverComponent } from './components/host-popover/host-popover.component';
import { HostPageComponent } from './host-page/host-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: HostPageComponent,
  },
];

/** Host module. */
@NgModule({
  declarations: [
    HostPageComponent,
    HostPopoverComponent,
    HostFeedbackComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonSharedModule,
  ],
  entryComponents: [
    HostPopoverComponent,
    HostFeedbackComponent,
  ],
})
export class HostModule { }
