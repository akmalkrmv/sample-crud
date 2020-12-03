import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<any> {
    return this.httpClient.get(`/api/getAll`);
  }

  public create(payload: any): Observable<any> {
    payload.animalId = this.random();
    return this.httpClient.post(`/api/create`, payload);
  }

  public update(animalId: any, payload: any): Observable<any> {
    return this.httpClient.put(`/api/update`, { animalId, ...payload });
  }

  private random(min: number = 2000, max: number = 100000): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
