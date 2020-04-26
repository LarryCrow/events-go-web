import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

/**
 * Core module.
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class CoreModule { }
