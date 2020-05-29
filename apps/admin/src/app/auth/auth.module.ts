import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonSharedModule } from '@ego/common/shared/shared.module';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];

/** Auth module. */
@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonSharedModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }
