import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

import { DestroyableBase } from './components/destroyable-base/destroyable-base.component';
import {
  FormControlValidationMessageComponent,
} from './components/form-control-validation-message/form-control-validation-message.component';
import { MapComponent } from './components/map/map.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

/**
 * Common shared module.
 */
@NgModule({
  declarations: [
    FormControlValidationMessageComponent,
    ValidationMessageComponent,
    MapComponent,
    DestroyableBase,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularYandexMapsModule,
  ],
  exports: [
    FormControlValidationMessageComponent,
    MapComponent,
    DestroyableBase,
  ],
})
export class CommonSharedModule { }
