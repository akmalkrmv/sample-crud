import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  Animal,
  AnimalOperationResponse,
  AnimalsQueryResponse,
} from '../models/animal';

@Injectable({ providedIn: 'root' })
export class MockService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  public getAll(): Observable<any> {
    return this.httpClient
      .get(`/api/getAll`)
      .pipe(map((response) => response as AnimalsQueryResponse));
  }

  public create(payload: any) {
    payload.animalId = this.random();
    payload.cowlId = this.random();

    return this.httpClient.post(`/api/create`, payload).pipe(
      map((response) => response as AnimalOperationResponse),
      tap((response) => this.notify(response))
    );
  }

  public update(animalId: string, payload: Partial<Animal>) {
    return this.httpClient.put(`/api/update`, { animalId, ...payload }).pipe(
      map((response) => response as AnimalOperationResponse),
      tap((response) => this.notify(response))
    );
  }

  public remove(animalId: string): Observable<any> {
    return this.httpClient.delete(`/api/remove/${animalId}`).pipe(
      map((response) => response as AnimalOperationResponse),
      tap((response) => this.notify(response))
    );
  }

  private notify(response: AnimalOperationResponse) {
    const message = response.success
      ? 'Operation was succesfull.'
      : 'Operation failed.';

    this.snackBar.open(message, 'OK', { duration: 2000 });
  }

  private random(min: number = 20000, max: number = 200000): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
