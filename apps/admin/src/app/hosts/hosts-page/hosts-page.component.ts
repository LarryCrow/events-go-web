import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Host } from '@ego/common/core/models/host';
import { Observable, ReplaySubject } from 'rxjs';
import { share, map, tap, first, switchMap, startWith } from 'rxjs/operators';

import { HostsService } from '../../core/services/hosts.service';

/** Hosts page. */
@Component({
  selector: 'egoa-hosts-page',
  templateUrl: './hosts-page.component.html',
  styleUrls: ['./hosts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostsPageComponent {
  /** Hosts */
  public readonly dataSource$: Observable<MatTableDataSource<Host>>;
  /** Displayed column for table. */
  public readonly displayedColumns: string[] = ['id', 'name', 'email', 'confirm'];
  /** Paginator. */
  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator;

  private readonly update$ = new ReplaySubject(1);

  /**
   * @constructor
   *
   * @param hostsService Hosts service.
   */
  public constructor(
    private readonly hostsService: HostsService,
  ) {
    const hosts$ = this.update$.pipe(
      startWith(null),
      switchMap(() => this.hostsService.getHosts()),
      share(),
    );

    this.dataSource$ = hosts$.pipe(
      map((hosts) => new MatTableDataSource(hosts)),
      tap((source) => source.paginator = this.paginator),
    );
  }

  /**
   * Handle 'click' of confirm.
   *
   * @param id Host id.
   */
  public onConfirmClick(id: number): void {
    this.hostsService.confirmHost(id)
      .pipe(first())
      .subscribe(() => this.update$.next());
  }
}
