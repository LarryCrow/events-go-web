import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Host } from '@ego/common/core/models/host';
import { Observable } from 'rxjs';
import { share, map, tap } from 'rxjs/operators';

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

  public constructor(
    private readonly hostsService: HostsService,
  ) {
    const hosts$ = this.hostsService.getHosts().pipe(share());
    this.dataSource$ = hosts$.pipe(
      map((hosts) => new MatTableDataSource(Array(30).fill(hosts[0]))),
      tap((source) => source.paginator = this.paginator),
    );
  }

  /**
   * Handle 'click' of confirm.
   *
   * @param id Host id.
   */
  public onConfirmClick(id: number): void {

  }
}
