import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@ego/web/app/shared/shared.module';

import { HostPageComponent } from './host-page/host-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: HostPageComponent,
  },
];

/**
 * Hosts module.
 */
@NgModule({
  declarations: [HostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class HostsModule { }
