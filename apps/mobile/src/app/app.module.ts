import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthInterceptor } from '@ego/common/core/interceptors/auth-interceptor';
import { BaseAuthService } from '@ego/common/core/services/auth.service';
import { Calendar } from '@ionic-native/calendar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './client/tabs/tabs.component';
import { AuthService } from './core/services/auth.service';

/**
 * App module for the mobile application.
 */
@NgModule({
  declarations: [AppComponent, TabsComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [AuthService] },
    { provide: BaseAuthService, useExisting: AuthService },
    Calendar,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
