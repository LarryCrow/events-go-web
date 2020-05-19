import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { IsHostGuard } from '@ego/common/core/guards/is-host.guard';
import { CommonSharedModule } from '@ego/common/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { SharedModule } from '../../shared/shared.module';

import { CreateEventPageComponent } from './create-event-page/create-event-page.component';
import { EditEventPageComponent } from './edit-event-page/edit-event-page.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';

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
    SearchFiltersComponent,
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
    MatTooltipModule,
    MatSelectModule,
    CommonSharedModule,
  ],
})
export class EventsModule { }
