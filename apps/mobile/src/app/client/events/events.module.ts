import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { EventDetailsPageComponent } from '../../shared/components/event-details-page/event-details-page.component';
import { SharedModule } from '../../shared/shared.module';

import { EventFiltersModal } from './components/event-filters-modal/event-filters-modal.component';
import { EventsPageComponent } from './events-page/events-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventsPageComponent,
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

/** Event module for mobile workspace */
@NgModule({
  declarations: [EventsPageComponent, EventFiltersModal],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EventFiltersModal,
  ],
})
export class EventsModule { }
