import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonSharedModule } from '../shared/shared.module';

/**
 * Core module.
 */
@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
  ],
})
export class CoreModule { }
