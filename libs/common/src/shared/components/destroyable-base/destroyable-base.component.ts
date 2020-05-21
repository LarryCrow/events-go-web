import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Destroyable base component.
 *
 * @description Extend this component to automaticly unsubscribe with `takeUntil`
 *
 * @usageNotes
 * class MyComponent extends DestroyableBase {
 *
 *   public myMethod() {
 *     interval(1000).pipe(
 *       takeUntil(this.destroy$)
 *     ).subscribe();
 *   }
 * }
 */
@Component({
  selector: 'egoc-destroyable-base',
  template: '',
})
// tslint:disable-next-line: component-class-suffix
export class DestroyableBase implements OnDestroy {
  /**
   * Emit once at OnDestroy hook.
   */
  protected readonly destroy$ = new Subject<void>();

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
