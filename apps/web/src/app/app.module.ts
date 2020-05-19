import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '@ego/common/core/interceptors/auth-interceptor';
import { BaseAuthService } from '@ego/common/core/services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './client/home-page/home-page.component';
import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';

/**
 * Main application module.
 */
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    SharedModule,
    MatMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [AuthService] },
    { provide: BaseAuthService, useExisting: AuthService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
