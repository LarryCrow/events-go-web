import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginPageComponent } from './login-page/login-page.component';
import {
  ClientRegistrationFormComponent,
} from './registration-page/components/client-registration-form/client-registration-form.component';
import { HostRegistrationFormComponent } from './registration-page/components/host-registration-form/host-registration-form.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

/**
 * Module routes.
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
  },
];

/**
 * Auth module.
 */
@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent,
    HostRegistrationFormComponent,
    ClientRegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule { }
