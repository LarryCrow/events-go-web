import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FormControlValidationMessageComponent,
} from './components/form-control-validation-message/form-control-validation-message.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

/**
 * Common shared module.
 */
@NgModule({
  declarations: [
    FormControlValidationMessageComponent,
    ValidationMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormControlValidationMessageComponent,
  ],
})
export class SharedModule { }
