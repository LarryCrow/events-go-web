import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { EventMapper } from '../mappers/event.mapper';
import { Event } from '../models/event';
import { EventSearchFilters } from '../models/event-search-filters';
import { SaveEventModel } from '../models/save-event';

import { AppConfig } from './app-config.service';
import { EventDto } from './dto/event-dto';
import { SubscriptionDto } from './dto/subscription-dto';

/**
 * Events service.
 */
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly EVENTS_URL = `${this.appConfig.baseUrl}events/`;
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

  /**
   * Gets list of events.
   */
  public getEvents(filters?: EventSearchFilters): Observable<Event[]> {
    const url = new URL('', this.EVENTS_URL);
    url.searchParams.set('title', filters.title || '');
    return this.http.get<EventDto[]>(url.toString())
      .pipe(
        map((events) => events.map(event => this.eventMapper.fromDto(event))),
      );
  }

  /**
   * Gets events by id.
   * @param id - Event id.
   */
  public getEvent(id: number | string): Observable<Event> {
    return this.http.get<EventDto>(`${this.EVENTS_URL}${id}`)
      .pipe(
        map((event) => this.eventMapper.fromDto(event)),
        catchError((err) => {
          let message = 'Что-то пошло не так';
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              message = 'Событие с таким индетификатор не найдено.';
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
    const body = {
      event_id: eventId,
    };
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
    const body = {
      title: data.title,
      price: data.price,
      description: data.description,
      place: data.place,
      date: data.date,
    };
    return this.http.post<EventDto>(`${this.EVENTS_URL}`, body)
      .pipe(
        map((res) => this.eventMapper.fromDto(res)),
      );
  }

  /**
   * Update event.
   */
  public update(data: SaveEventModel): Observable<any> {
    return null;
  }
}
