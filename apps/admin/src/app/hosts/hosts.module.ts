import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostsPageComponent } from './hosts-page/hosts-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HostsPageComponent,
  },
];

/** Hosts module. */
@NgModule({
  declarations: [HostsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class HostsModule { }
