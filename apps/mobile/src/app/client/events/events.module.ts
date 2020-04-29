import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events-page/events-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventsPageComponent,
  },
];

@NgModule({
  declarations: [EventsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class EventsModule { }
