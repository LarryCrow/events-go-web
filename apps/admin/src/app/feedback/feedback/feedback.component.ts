import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { startWith, switchMap, share, map, tap } from 'rxjs/operators';

import { Feedback } from '../../core/models/feedback';
import { FeedbackService } from '../../core/services/feedback.service';

/** Feedback page. */
@Component({
  selector: 'egoa-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  /** Feedback data for table. */
  public readonly dataSource$: Observable<MatTableDataSource<Feedback>>;
  /** Displayed column for table. */
  public readonly displayedColumns: string[] = ['id', 'email', 'message'];
  /** Paginator. */
  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator;

  private readonly update$ = new ReplaySubject(1);

  /**
   * @constructor
   *
   * @param feedbackService Feedback service.
   */
  public constructor(
    private readonly feedbackService: FeedbackService,
  ) {
    const feedback$ = this.feedbackService.getFeedbackList()
      .pipe(share());

    this.dataSource$ = feedback$.pipe(
      map((feedback) => new MatTableDataSource(feedback)),
      tap((source) => source.paginator = this.paginator),
    );
  }

}
