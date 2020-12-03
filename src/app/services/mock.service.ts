import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  Event,
  EventOperationResponse,
  EventsQueryResponse,
} from '@models/index';

@Injectable({ providedIn: 'root' })
export class MockService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  public getAll(): Observable<any> {
    return this.httpClient
      .get(`/api/getAll`)
      .pipe(map((response) => response as EventsQueryResponse));
  }

  public create(payload: Partial<Event>) {
    payload.animalId = this.random().toString();
    payload.cowId = this.random();
    payload.eventId = this.random();

    return this.httpClient.post(`/api/create`, payload).pipe(
      map((response) => response as EventOperationResponse),
      tap((response) => this.notify(response))
    );
  }

  public update(eventId: number, payload: Partial<Event>) {
    return this.httpClient.put(`/api/update`, { eventId, ...payload }).pipe(
      map((response) => response as EventOperationResponse),
      tap((response) => this.notify(response))
    );
  }

  public remove(eventId: number): Observable<any> {
    return this.httpClient.delete(`/api/remove/${eventId}`).pipe(
      map((response) => response as EventOperationResponse),
      tap((response) => this.notify(response))
    );
  }

  private notify(response: EventOperationResponse) {
    const message = response.success
      ? 'Operation was succesfull. Changes saved to cache.'
      : 'Operation failed.';

    this.snackBar.open(message, 'OK', { duration: 2000 });
  }

  private random(min: number = 20000, max: number = 200000): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
