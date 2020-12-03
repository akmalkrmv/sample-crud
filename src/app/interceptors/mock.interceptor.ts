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
import { data } from '../core/mock-data';
import { Animal } from '../models/animal';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { method, url, body } = request;

    if (method === 'GET' && url.endsWith('/api/getAll')) {
      return this.responseWithDelay({ status: 200, body: data });
    }

    if (method === 'POST' && url.endsWith('/api/create')) {
      data.result.unshift(body);
      return this.responseWithDelay({ status: 200, body: data });
    }

    if (method === 'PUT' && url.endsWith('/api/update')) {
      const index = this.findIndex(body);

      if (index >= 0) {
        data.result[index] = body;
        return this.responseWithDelay({ status: 200, body });
      } else {
        return this.responseWithDelay({ status: 404, body });
      }
    }

    if (method === 'DELETE' && url.endsWith('/api/delete')) {
      const index = this.findIndex(body);

      if (index >= 0) {
        data.result.splice(index, 1);
        return this.responseWithDelay({ status: 200, body });
      } else {
        return this.responseWithDelay({ status: 404, body });
      }
    }

    return next.handle(request);
  }

  private findIndex(animal: Animal): number {
    return data.result.findIndex(
      (item) => item.animalId === animal.animalId
    );
  }

  private responseWithDelay({ status, body }) {
    return of(new HttpResponse({ status, body })).pipe(delay(this.random()));
  }

  private random(min: number = 500, max: number = 2000): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
