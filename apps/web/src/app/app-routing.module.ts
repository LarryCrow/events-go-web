import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './client/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./client/events/events.module').then(m => m.EventsModule),
  },
  {
    path: 'hosts',
    loadChildren: () => import('./client/hosts/hosts.module').then(m => m.HostsModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./client/about/about.module').then(m => m.AboutModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

/**
 * Routing for the AppModule.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
