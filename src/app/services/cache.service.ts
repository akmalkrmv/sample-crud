import { Injectable } from '@angular/core';
import { AnimalsQueryResponse } from '../models/animal';
import { data as MockData } from '../core/mock-data';

const KEY = 'cached-data';

@Injectable({ providedIn: 'root' })
export class CacheService {
  public getData(): AnimalsQueryResponse {
    return this.cache || (this.cache = MockData);
  }

  public update(value: AnimalsQueryResponse) {
    this.cache = value;
  }

  public clear() {
    this.cache = null;
  }

  private get cache(): AnimalsQueryResponse {
    return localStorage.getItem(KEY)
      ? (JSON.parse(localStorage.getItem(KEY)) as AnimalsQueryResponse)
      : null;
  }
  private set cache(value: AnimalsQueryResponse) {
    localStorage.setItem(KEY, JSON.stringify(value));
  }
}
