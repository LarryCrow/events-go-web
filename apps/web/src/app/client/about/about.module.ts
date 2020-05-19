import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@ego/web/app/shared/shared.module';

import { AboutPageComponent } from './about-page/about-page.component';
import { CommonSharedModule } from '@ego/common/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AboutPageComponent,
  },
];

/**
 * About us module.
 */
@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonSharedModule,
  ],
})
export class AboutModule { }
