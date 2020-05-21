import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HostMapper } from '../mappers/host.mapper';
import { Host } from '../models/host';

import { AppConfig } from './app-config.service';
import { HostDto } from './dto/host-dto';

/**
 * Hosts service.
 */
@Injectable({
  providedIn: 'root',
})
export class HostsService {
  private readonly baseUrl = this.appConfig.baseUrl;

  /**
   * @constructor
   *
   * @param http Http client.
   * @param appConfig App configuration.
   * @param hostMapper Host mapper.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly hostMapper: HostMapper,
  ) { }

  /**
   * Get host by id.
   *
   * @param id Host id.
   */
  public getHost(id: number): Observable<Host> {
    const url = `${this.baseUrl}hosts/${id}`;
    return this.http.get<HostDto>(url)
      .pipe(
        map((host) => this.hostMapper.fromDto(host)),
      );
  }
}
