import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import { EventTypeMapper } from '../mappers/event-type-mapper';
import { EventType } from '../models/event-type';

import { AppConfig } from './app-config.service';
import { EventTypeDto } from './dto/event-type-dto';
import { Pagination } from './dto/pagination';

/**
 * Event types service.
 */
@Injectable({
  providedIn: 'root',
})
export class EventTypesService {
  private readonly BASE_URL = this.appConfig.baseUrl;

  private readonly eventTypes$: Observable<EventType[]>;

  /**
   * @constructor
   *
   * @param http Http client
   * @param appConfig App configuration
   * @param eventTypeMapper Event type mapper.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly eventTypeMapper: EventTypeMapper,
  ) {
    this.eventTypes$ = this.obtainEventTypes().pipe(shareReplay(1));
  }

  /**
   * Get event types.
   */
  public getEventTypes(): Observable<EventType[]> {
    return this.eventTypes$;
  }

  private obtainEventTypes(): Observable<EventType[]> {
    return this.http.get<Pagination<EventTypeDto>>(`${this.BASE_URL}eventtypes`)
      .pipe(
        map((pag) => pag.results.map(t => this.eventTypeMapper.fromDto(t))),
      );
  }
}
