import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mapTo, shareReplay } from 'rxjs/operators';

import { createHttpParams } from '../../shared/utils/http-params';
import { EventMapper } from '../mappers/event.mapper';
import { Event } from '../models/event';
import { EventSearchFilters } from '../models/event-search-filters';
import { Pagination } from '../models/pagination';
import { SaveEventModel } from '../models/save-event';

import { AppConfig } from './app-config.service';
import { EventDto } from './dto/event-dto';
import { PaginationDto } from './dto/pagination-dto';
import { SubscriptionDto } from './dto/subscription-dto';
import { EventType } from '../models/event-type';
import { EventTypeMapper } from '../mappers/event-type-mapper';
import { EventTypeDto } from './dto/event-type-dto';

const EVENTS_PER_PAGE = 12;

/**
 * Events service.
 */
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly eventsBaseUrl = `${this.appConfig.baseUrl}events/`;
  private readonly subscriptionBaseUrl = `${this.appConfig.baseUrl}subscriptions/`;
  private readonly eventTypes$: Observable<EventType[]>;

  /**
   * @constructor
   *
   * @param http - HTTP service.
   * @param appConfig - App configuration.
   * @param eventMapper - Event mapper.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly eventMapper: EventMapper,
    private readonly eventTypeMapper: EventTypeMapper,
  ) {
    this.eventTypes$ = this.getTypes().pipe(shareReplay(1));
  }

  /**
   * Gets list of events.
   */
  public getEvents(filters?: EventSearchFilters, page: number = 1): Observable<Pagination<Event>> {
    const params = createHttpParams(filters)
      .set('page', page.toString())
      .set('limit', EVENTS_PER_PAGE.toString());
    return this.http.get<PaginationDto<EventDto>>(this.eventsBaseUrl, { params })
      .pipe(map(this.mapTopicPagination));
  }

  /**
   * Gets events by id.
   * @param id - Event id.
   */
  public getEvent(id: number | string): Observable<Event> {
    return this.http.get<EventDto>(`${this.eventsBaseUrl}${id}`)
      .pipe(
        map((event) => this.eventMapper.fromDto(event)),
        catchError((err) => {
          let message = 'Что-то пошло не так';
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              message = 'Событие с таким номером не найдено.';
            }
          }
          return throwError(new Error(message));
        }),
      );
  }

  /**
   * Subscribe on an event.
   *
   * @param eventId Event id.
   */
  public subscribe(eventId: number): Observable<boolean> {
    const body = {
      event_id: eventId,
    };
    return this.http.post<SubscriptionDto>(this.subscriptionBaseUrl, body)
      .pipe(mapTo(true));
  }

  /**
   * Unsubscribe from an event.
   *
   * @param eventId Event id.
   */
  public unsubscribe(eventId: number): Observable<boolean> {
    return this.http.delete<SubscriptionDto>(`${this.subscriptionBaseUrl}${eventId}`)
      .pipe(mapTo(true));
  }

  /**
   * Checks if user subscribe or not.
   *
   * @param eventId Event id.
   */
  public isUserSubscribed(eventId: number): Observable<boolean> {
    return this.http.get(`${this.subscriptionBaseUrl}${eventId}`)
      .pipe(
        map((res) => res['is_subscribed']),
      );
  }

  /**
   * Creates an event.
   *
   * @param data Data to create an event.
   */
  public create(data: SaveEventModel): Observable<Event> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append('place', data.place);
    formData.append('start', data.start);
    formData.append('end', data.end);
    formData.append('avatar', data.avatar);
    formData.append('type_id', data.type_id.toString());
    return this.http.post<EventDto>(this.eventsBaseUrl, formData)
      .pipe(
        map((res) => this.eventMapper.fromDto(res)),
      );
  }

  /**
   * Update event.
   */
  public update(data: SaveEventModel): Observable<any> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append('place', data.place);
    formData.append('start', data.start);
    formData.append('end', data.end);
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    formData.append('type_id', data.type_id.toString());
    return this.http.patch<EventDto>(`${this.eventsBaseUrl}${data.id}/`, formData)
      .pipe(
        map((res) => this.eventMapper.fromDto(res)),
      );
  }

  /**
   * Get event types.
   */
  public getEventTypes(): Observable<EventType[]> {
    return this.eventTypes$;
  }

  /**
   * Get a user events.
   */
  public getMyEvents(): Observable<Event[]> {
    return this.http.get<EventDto[]>(`${this.eventsBaseUrl}/my`)
      .pipe(
        map((events) => events.map(event => this.eventMapper.fromDto(event))),
      );
  }

  private mapTopicPagination = pagination => {
    return {
      items: pagination.results.map((event: EventDto) =>
        this.eventMapper.fromDto(event),
      ),
      pagesCount: Math.ceil(pagination.count / EVENTS_PER_PAGE),
      itemsCount: pagination.count,
    };
  }

  private getTypes(): Observable<EventType[]> {
    return this.http.get<EventTypeDto[]>(`${this.eventsBaseUrl}types/`)
      .pipe(
        map((events) => events.map(t => this.eventTypeMapper.fromDto(t))),
      );
  }
}
