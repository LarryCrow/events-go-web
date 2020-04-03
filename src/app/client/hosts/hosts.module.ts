import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostPageComponent } from './host-page/host-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
