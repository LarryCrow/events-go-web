import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonSharedModule } from '@ego/common/shared/shared.module';
import { Calendar } from '@ionic-native/calendar/ngx';
import { IonicModule } from '@ionic/angular';

import { EventCardComponent } from './components/event-card/event-card.component';
import { EventDetailsPageComponent } from './components/event-details-page/event-details-page.component';
import { EventDetailsPopoverComponent } from './components/event-details-popover/event-details-popover.component';

/** Shared module */
@NgModule({
  declarations: [
    EventCardComponent,
    EventDetailsPageComponent,
    EventDetailsPopoverComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    CommonSharedModule,
  ],
  exports: [
    EventCardComponent,
    EventDetailsPageComponent,
  ],
  entryComponents: [
    EventDetailsPopoverComponent,
  ],
  providers: [
    Calendar,
  ],
})
export class SharedModule {

}
