import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@ego/common/core/services/loading.service';
import { Observable } from 'rxjs';

/**
 * Loading component
 */
@Component({
  selector: 'ego-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  /**
   * Loading controller.
   */
  public readonly isLoading$: Observable<boolean>;

  /**
   * @constructor
   *
   * @param loadingService Loading service.
   */
  public constructor(
    loadingService: LoadingService,
  ) {
    this.isLoading$ = loadingService.isLoading$;
  }
}
