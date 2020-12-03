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
import { Animal, AnimalOperationResponse } from '../models/animal';
import { CacheService } from '../services/cache.service';

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
      console.log(body)
      const index = this.findIndex(body);

      if (index >= 0) {
        data.result[index] = body;
        this.cache.update(data);

        return this.success(body);
      } else {
        return this.fail(body);
      }
    }

    if (method === 'DELETE' && url.includes('/api/remove')) {
      const animalId = this.getLastUrlSegment(url);
      const index = this.findIndex({ animalId });

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

  private findIndex({ animalId }: Partial<Animal>): number {
    return data.result.findIndex((item) => item.animalId == animalId);
  }

  private success(data) {
    return this.responseWithDelay({
      status: 200,
      body: {
        data,
        success: true,
      } as AnimalOperationResponse,
    });
  }

  private fail(data) {
    return this.responseWithDelay({
      status: 400,
      body: {
        data,
        success: false,
      } as AnimalOperationResponse,
    });
  }

  private responseWithDelay({ status, body }: { status?: number; body: any }) {
    return of(new HttpResponse({ status, body })).pipe(delay(this.random()));
  }

  private random(min: number = 300, max: number = 2000): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private getLastUrlSegment(url: string) {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }
}
