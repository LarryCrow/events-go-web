import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonSharedModule } from '@ego/common/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login/login.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
    LoginComponent,
    RegisterComponent,
    LogoutPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonSharedModule,
  ],
})
export class AuthModule { }
