import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { IsHostGuard } from 'src/app/core/guards/is-host.guard';

import { SharedModule } from '../../shared/shared.module';

import { CreateEventPageComponent } from './create-event-page/create-event-page.component';
import { EditEventPageComponent } from './edit-event-page/edit-event-page.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventsPageComponent,
  },
  {
    path: 'create',
    component: CreateEventPageComponent,
    canActivate: [IsHostGuard],
  },
  {
    path: 'my',
    component: MyEventsPageComponent,
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
    EventsPageComponent,
    EventDetailsComponent,
    CreateEventPageComponent,
    EventFormComponent,
    EditEventPageComponent,
    MyEventsPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class EventsModule { }
