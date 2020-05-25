import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';

import { HostPageComponent } from './host-page/host-page.component';
import { HostsPageComponent } from './hosts-page/hosts-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HostsPageComponent,
  },
  {
    path: ':id',
    component: HostPageComponent,
  },
];

/** Hosts module. */
@NgModule({
  declarations: [HostsPageComponent, HostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class HostsModule { }
