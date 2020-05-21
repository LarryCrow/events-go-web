import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MenuPageComponent } from './menu-page/menu-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MenuPageComponent,
  },
  {
    path: 'about',
    loadChildren: () => import('../about/about.module').then(m => m.AboutModule),
  },
];

/**
 * Menu module.
 */
@NgModule({
  declarations: [MenuPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
})
export class MenuModule { }
