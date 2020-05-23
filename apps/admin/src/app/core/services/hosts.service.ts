import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/** Host service. */
@Injectable({ 'providedIn': 'root' })
export class HostsService {

  public constructor(
    private readonly http: HttpClient,
  ) { }
}