import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditHostPageComponent } from './edit-host-page/edit-host-page.component';
import { HostPageComponent } from './host-page/host-page.component';

const routes: Routes = [
  {
    path: 'edit',
    component: EditHostPageComponent,
  },
  {
    path: ':id',
    component: HostPageComponent,
  },
];

/**
 * Hosts module.
 */
@NgModule({
  declarations: [HostPageComponent, EditHostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class HostsModule { }
