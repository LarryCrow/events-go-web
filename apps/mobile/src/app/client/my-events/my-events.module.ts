import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyEventsPageComponent } from './my-events-page/my-events-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyEventsPageComponent,
  },
];

@NgModule({
  declarations: [MyEventsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class MyEventsModule { }
