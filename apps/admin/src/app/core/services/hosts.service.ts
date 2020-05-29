import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostMapper } from '@ego/common/core/mappers/host.mapper';
import { Host } from '@ego/common/core/models/host';
import { AppConfig } from '@ego/common/core/services/app-config.service';
import { HostDto } from '@ego/common/core/services/dto/host-dto';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

/** Host service. */
@Injectable({ 'providedIn': 'root' })
export class HostsService {
  private readonly hostsUrl = `${this.appConfig.baseUrl}staff/hosts/`;

  /**
   * @constructor
   *
   * @param http Http client.
   * @param hostMapper Host mapper.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly hostMapper: HostMapper,
  ) { }

  /** Get hosts. */
  public getHosts(): Observable<Host[]> {
    return this.http.get<HostDto[]>(this.hostsUrl)
      .pipe(map((hosts) => hosts.map(host => this.hostMapper.fromDto(host))));
  }

  /** Get host by id.
   *
   * @param id Host id.
   */
  public getHost(id: number): Observable<Host> {
    const url = `${this.hostsUrl}${id}`;
    return this.http.get<HostDto>(url)
      .pipe(map((host) => this.hostMapper.fromDto(host)));
  }

  /**
   * Confirm host
   */
  public confirmHost(id: number): Observable<void> {
    const url = new URL(`${id}/`, this.hostsUrl);
    return this.http.patch(url.toString(), {}).pipe(
      mapTo(null),
    );
  }
}
