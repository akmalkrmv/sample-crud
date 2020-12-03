import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Event, EventOperationResponse } from '@models/index';
import { CacheService } from '@services/index';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor(private cache: CacheService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { method, url, body } = request;

    let data = this.cache.getData();

    if (method === 'GET' && url.endsWith('/api/getAll')) {
      return this.responseWithDelay({ status: 200, body: data });
    }

    if (method === 'POST' && url.endsWith('/api/create')) {
      data.result.unshift(body);
      this.cache.update(data);

      return this.success(body);
    }

    if (method === 'PUT' && url.endsWith('/api/update')) {
      const index = this.findIndex(data, body);

      if (index >= 0) {
        data.result[index] = body;
        this.cache.update(data);

        return this.success(body);
      } else {
        return this.fail(body);
      }
    }

    if (method === 'DELETE' && url.includes('/api/remove')) {
      const eventId = this.getLastUrlSegment(url);
      const index = this.findIndex(data, { eventId });

      if (index >= 0) {
        data.result.splice(index, 1);
        this.cache.update(data);

        return this.success(body);
      } else {
        return this.fail(body);
      }
    }

    return next.handle(request);
  }

  private findIndex(data, { eventId }: Partial<Event>): number {
    return data.result.findIndex((item) => item.eventId == eventId);
  }

  private success(data) {
    const body = { data, success: false } as EventOperationResponse;
    return of(new HttpResponse({ status: 200, body }));
  }

  private fail(data) {
    const body = { data, success: false } as EventOperationResponse;
    return of(new HttpResponse({ status: 400, body }));
  }

  private responseWithDelay({ status, body }: { status?: number; body: any }) {
    return of(new HttpResponse({ status, body })).pipe(delay(this.random()));
  }

  private random(min: number = 100, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private getLastUrlSegment(url: string) {
    const segments = url.split('/');
    return +segments[segments.length - 1];
  }
}
