import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { EventDetailsComponent } from './event-details/event-details.component';
import { EventListItemComponent } from './event-list-item/event-list-item.component';
import { EventsListComponent } from './events-list/events-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventsListComponent,
  },
  {
    path: 'create',
    redirectTo: '',
  },
  {
    path: ':id/edit',
    redirectTo: ':id',
  },
  {
    path: ':id',
    component: EventDetailsComponent,
  },
];

/**
 * Events module.
 */
@NgModule({
  declarations: [
    EventsListComponent,
    EventListItemComponent,
    EventDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class EventsModule { }
