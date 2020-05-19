import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonSharedModule } from '@ego/common/shared/shared.module';

import { SharedModule } from '../shared/shared.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import {
  ClientRegistrationFormComponent,
} from './registration-page/components/client-registration-form/client-registration-form.component';
import { HostRegistrationComponent } from './registration-page/components/host-registration/host-registration.component';
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
  {
    path: 'logout',
    component: LogoutPageComponent,
  },
];

/**
 * Auth module.
 */
@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent,
    ClientRegistrationFormComponent,
    LogoutPageComponent,
    HostRegistrationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonSharedModule,
  ],
})
export class AuthModule { }
