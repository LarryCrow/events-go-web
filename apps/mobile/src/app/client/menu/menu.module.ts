import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPageComponent } from './menu-page/menu-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MenuPageComponent,
  },
];

@NgModule({
  declarations: [MenuPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class MenuModule { }
