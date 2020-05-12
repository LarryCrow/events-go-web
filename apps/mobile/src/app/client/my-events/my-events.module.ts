import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { EventDetailsPageComponent } from '../../shared/components/event-details-page/event-details-page.component';
import { SharedModule } from '../../shared/shared.module';

import { MyEventsPageComponent } from './my-events-page/my-events-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyEventsPageComponent,
  },
  {
    path: ':id',
    component: EventDetailsPageComponent,
  },
  {
    path: 'host',
    loadChildren: () => import('../../shared/modules/host/host.module').then(m => m.HostModule),
  },
];

/** My events module. */
@NgModule({
  declarations: [MyEventsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    IonicModule,
  ],
})
export class MyEventsModule { }
