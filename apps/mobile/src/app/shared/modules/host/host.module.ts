import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HostPageComponent } from './host-page/host-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: HostPageComponent,
  },
];

/** Host module. */
@NgModule({
  declarations: [HostPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class HostModule { }
