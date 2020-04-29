import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SharedModule as CommonSharedModule } from '@ego/common/shared/shared.module';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HostEditFormComponent } from './components/host-edit-form/host-edit-form.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MapComponent } from './components/map/map.component';
import { UploaderComponent } from './components/uploader/uploader.component';

/**
 * Shared module.
 */
@NgModule({
  declarations: [
    DialogInfoComponent,
    MapComponent,
    UploaderComponent,
    EventsListComponent,
    EventListItemComponent,
    HeaderMenuComponent,
    HostEditFormComponent,
    EventCardComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AngularYandexMapsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonSharedModule,
  ],
  exports: [
    MapComponent,
    UploaderComponent,
    EventsListComponent,
    EventListItemComponent,
    HeaderMenuComponent,
    HostEditFormComponent,
    EventCardComponent,
    LoadingComponent,
  ],
  entryComponents: [
    DialogInfoComponent,
  ],
})
export class SharedModule { }
