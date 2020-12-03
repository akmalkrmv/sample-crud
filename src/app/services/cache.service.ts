import { Injectable } from '@angular/core';
import { EventsQueryResponse } from '@models/index';
import { data as MockData } from '../core/mock-data';

const KEY = 'cached-data';

@Injectable({ providedIn: 'root' })
export class CacheService {
  public getData(): EventsQueryResponse {
    return this.cache || (this.cache = MockData);
  }

  public update(value: EventsQueryResponse) {
    this.cache = value;
  }

  public clear() {
    this.cache = null;
  }

  private get cache(): EventsQueryResponse {
    return localStorage.getItem(KEY)
      ? (JSON.parse(localStorage.getItem(KEY)) as EventsQueryResponse)
      : null;
  }
  private set cache(value: EventsQueryResponse) {
    localStorage.setItem(KEY, JSON.stringify(value));
  }
}
