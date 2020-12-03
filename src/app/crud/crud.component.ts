import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MockService } from '../services/mock.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  public loading$ = new BehaviorSubject(false);
  public jsonView$ = new BehaviorSubject(false);
  public response$: Observable<any>;
  public list$: Observable<any>;

  constructor(private service: MockService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData() {
    this.loading$.next(true);

    this.list$ = this.service.getAll().pipe(
      tap(console.log),
      // map((response) => (Math.random() > 0.5 ? response.result : [])),
      map((response) => response.result),
      tap(() => this.loading$.next(false))
    );
  }

  public toggleJsonView() {
    this.jsonView$.next(!this.jsonView$.value);
  }
}
