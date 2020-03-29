import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes, RouterModule } from '@angular/router';
import { IsHostGuard } from 'src/app/core/guards/is-host.guard';

import { SharedModule } from '../../shared/shared.module';

import { CreateEventPageComponent } from './create-event-page/create-event-page.component';
import { EditEventPageComponent } from './edit-event-page/edit-event-page.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './event-form/event-form.component';
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
    component: CreateEventPageComponent,
    canActivate: [IsHostGuard],
  },
  {
    path: ':id/edit',
    component: EditEventPageComponent,
    canActivate: [IsHostGuard],
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
    CreateEventPageComponent,
    EventFormComponent,
    EditEventPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
})
export class EventsModule { }
