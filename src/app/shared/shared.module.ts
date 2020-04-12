import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import {
  FormControlValidationMessageComponent,
} from './components/form-control-validation-message/form-control-validation-message.component';
import { MapComponent } from './components/map/map.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
/**
 * Shared module.
 */
@NgModule({
  declarations: [
    DialogInfoComponent,
    MapComponent,
    ValidationMessageComponent,
    FormControlValidationMessageComponent,
    UploaderComponent,
    EventsListComponent,
    EventListItemComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AngularYandexMapsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    MapComponent,
    ValidationMessageComponent,
    FormControlValidationMessageComponent,
    UploaderComponent,
    EventsListComponent,
    EventListItemComponent,
  ],
  entryComponents: [
    DialogInfoComponent,
  ],
})
export class SharedModule { }
