import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, Observable, of } from 'rxjs';
import { startWith, switchMap, tap, mapTo } from 'rxjs/operators';

/**
 * Loading service.
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly loading$ = new ReplaySubject<boolean>(1);

  /**
   * Is loading.
   */
  public readonly isLoading$: Observable<boolean>;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.isLoading$ = this.initLoadingStream();
  }

  /**
   * Turn the loading on.
   */
  public show(): void {
    this.loading$.next(true);
  }

  /**
   * Turn the loading off.
   */
  public hide(): void {
    this.loading$.next(false);
  }

  private initLoadingStream(): Observable<boolean> {
    const show$ = of(null).pipe(
      // To remove scrollbar when loading is active.
      tap(() => this.document.body.style.overflow = 'hidden'),
      mapTo(true),
    );

    const hide$ = of(null).pipe(
      tap(() => this.document.body.style.overflow = 'unset'),
      mapTo(false),
    );

    return this.loading$.pipe(
      switchMap((val) => val ? show$ : hide$),
      startWith(false),
    );
  }
}
