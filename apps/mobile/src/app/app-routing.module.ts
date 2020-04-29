import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TabsComponent } from './client/tabs/tabs.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'schedules',
      },
      {
        path: 'events',
        loadChildren: () => import('./client/events/events.module').then(m => m.EventsModule),
      },
      {
        path: 'my-events',
        loadChildren: () => import('./client/my-events/my-events.module').then(m => m.MyEventsModule),
      },
      {
        path: 'menu',
        loadChildren: () => import('./client/menu/menu.module').then(m => m.MenuModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
