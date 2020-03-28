import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AddressMapper } from '../mappers/address.mapper';
import { Address } from '../models/address';

import { AppConfig } from './app-config.service';
import { AddressSuggestionDto } from './dto/suggestion-place-dto';

/**
 * Service to work with addresess ang geocoordinates.
 */
@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly baseUrl = this.appConfig.baseDadatasUrl;
  private readonly GEOCODE_URL = `${this.baseUrl}geolocate/address`;
  private readonly SUGGESION_URL = `${this.baseUrl}suggest/address`;

  private constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly addressMapper: AddressMapper,
  ) { }

  /**
   * Gets address coordinates.
   */
  public getCoordinatesByAddress(address: string): Observable<Address> {
    const body = {
      query: address,
      // To get only one value.
      count: 1,
      // To set that we want to search at Krasnoyarsk.
      locations: [{
        city_fias_id: '9b968c73-f4d4-4012-8da8-3dacd4d4c1bd',
      }],
    };
    return this.httpClient.post<AddressSuggestionDto>(this.SUGGESION_URL, body)
      .pipe(
        map((res) => this.addressMapper.fromDto(res.suggestions[0])),
      );
  }

  /**
   * Gets readable address value by coordinates.
   */
  public getAddressByCoordinates(coords: [number, number]): Observable<Address> {
    const params = new HttpParams()
      .set('lat', coords[0].toString())
      .set('lon', coords[1].toString());
    return this.httpClient.get<AddressSuggestionDto>(this.GEOCODE_URL, { params })
      .pipe(map((res) => this.addressMapper.fromDto(res.suggestions[0])));
  }

  /**
   * Suggest address by value.
   * @param value Value to search.
   */
  public suggestAddress(value: string): Observable<Address[]> {
    const body = {
      query: value,
      count: 5,
      // To set that we want to search at Krasnoyarsk.
      locations: [{
        city_fias_id: '9b968c73-f4d4-4012-8da8-3dacd4d4c1bd',
      }],
    };
    return this.httpClient.post<AddressSuggestionDto>(this.SUGGESION_URL, body)
      .pipe(
        map((res) => res.suggestions.map((suggestion) => this.addressMapper.fromDto(suggestion))),
      );
  }
}
