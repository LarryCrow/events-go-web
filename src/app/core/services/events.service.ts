import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { createHttpParams } from 'src/app/shared/utils/http-params';

import { EventMapper } from '../mappers/event.mapper';
import { Event } from '../models/event';
import { EventSearchFilters } from '../models/event-search-filters';
import { SaveEventModel } from '../models/save-event';

import { AppConfig } from './app-config.service';
import { EventDto } from './dto/event-dto';
import { SubscriptionDto } from './dto/subscription-dto';
import { Pagination } from './dto/pagination';

/**
 * Events service.
 */
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly EVENTS_URL = `${this.appConfig.baseUrl}events`;
  private readonly SUBSCRIPTION_URL = `${this.appConfig.baseUrl}subscription/`;

  /**
   * @constructor
   * @param http - HTTP service.
   * @param appConfig - App configuration.
   * @param eventMapper - Event mapper.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly eventMapper: EventMapper,
  ) { }

  /** Debug flag. */
  public mockData = true;

  /**
   * Gets list of events.
   */
  public getEvents(filters?: EventSearchFilters): Observable<Event[]> {
    const params = createHttpParams(filters);
    return this.http.get<Pagination<EventDto>>(this.EVENTS_URL, { params })
      .pipe(
        map((obj) => obj.results.map(event => this.eventMapper.fromDto(event))),
        map((events) => {
          if (this.mockData) {
            return [...events, ...events, ...events, ...events];
          }
          return events;
        }),
      );
  }

  /**
   * Gets events by id.
   * @param id - Event id.
   */
  public getEvent(id: number | string): Observable<Event> {
    return this.http.get<EventDto>(`${this.EVENTS_URL}/${id}`)
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
  public subscribe(eventId: number): Observable<number> {
    const body = {
      event_id: eventId,
    };
    return this.http.post<SubscriptionDto>(this.SUBSCRIPTION_URL, body)
      .pipe(
        map((res) => res.event_id),
      );
  }

  /**
   * Unsubscribe from an event.
   *
   * @param eventId Event id.
   */
  public unsubscribe(eventId: number): Observable<number> {
    return this.http.delete<SubscriptionDto>(`${this.SUBSCRIPTION_URL}${eventId}`)
      .pipe(
        map((res) => res.event_id),
      );
  }

  /**
   * Checks if user subscribe or not.
   *
   * @param eventId Event id.
   */
  public isUserSubscribed(eventId: number): Observable<boolean> {
    return this.http.get(`${this.SUBSCRIPTION_URL}${eventId}`)
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
    return this.http.post<EventDto>(`${this.EVENTS_URL}/`, formData)
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
    return this.http.patch<EventDto>(`${this.EVENTS_URL}/${data.id}/`, formData)
      .pipe(
        map((res) => this.eventMapper.fromDto(res)),
      );
  }

  /**
   * Get a user events.
   */
  public getMyEvents(): Observable<Event[]> {
    return this.http.get<EventDto[]>(`${this.EVENTS_URL}/my`)
      .pipe(
        map((events) => events.map(event => this.eventMapper.fromDto(event))),
      );
  }
}
