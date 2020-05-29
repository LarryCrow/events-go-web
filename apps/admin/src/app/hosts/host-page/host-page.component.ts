import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Host } from '@ego/common/core/models/host';
import { Observable } from 'rxjs';
import { map, switchMap, shareReplay, first } from 'rxjs/operators';

import { HostsService } from '../../core/services/hosts.service';
import { MatTableDataSource } from '@angular/material/table';

interface HostTable {
  /** Field name */
  name: string;
  /** Field value */
  value: string;
}

/**
 * Host page.
 */
@Component({
  selector: 'egoa-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostPageComponent {
  /** Data for mat-table */
  public readonly dataSource$: Observable<MatTableDataSource<HostTable>>;
  /** Host name */
  public readonly hostName$: Observable<string>;

  private readonly hostId$: Observable<number>;

  /**
   * @constructor
   *
   * @param route Activated route.
   * @param hostsService Hosts service.
   */
  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly hostsService: HostsService,
  ) {
    const host$ = this.route.paramMap.pipe(
      map((params) => parseInt(params.get('id'), 10)),
      switchMap((id) => this.hostsService.getHost(id)),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      }),
    );

    this.dataSource$ = host$.pipe(
      map(this.mapHostToTableData),
      map((hostTable) => new MatTableDataSource(hostTable)),
    );

    this.hostName$ = host$.pipe(map((host) => host.name));
    this.hostId$ = host$.pipe(map(host => host.id));
  }

  /**
   * Handle 'click' of confirm.
   *
   * @param id Host id.
   */
  public onConfirmClick(): void {
    this.hostId$.pipe(
      switchMap((id) => this.hostsService.confirmHost(id)),
      first(),
    ).subscribe(() => this.router.navigate(['/hosts']));
  }

  private mapHostToTableData(host: Host): HostTable[] {
    return [
      { name: 'Email', value: host.email },
      { name: 'Описание', value: host.about },
      { name: 'Телефон', value: host.phone },
      { name: 'Инстаграмм', value: host.social.instagram },
      { name: 'Телеграмм', value: host.social.telegram },
      { name: 'Твиттер', value: host.social.twitter },
      { name: 'ВК', value: host.social.vk },
    ] as HostTable[];
  }
}
