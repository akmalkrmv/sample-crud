import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Animal, AnimalsQueryResponse } from '../models/animal';
import { MockService } from '../services/mock.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  public loading$ = new BehaviorSubject(false);
  public jsonView$ = new BehaviorSubject(false);
  public editingElement$ = new BehaviorSubject<Partial<Animal>>(null);

  public response$: Observable<AnimalsQueryResponse>;
  public list$: Observable<Partial<Animal>[]>;

  constructor(private service: MockService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData() {
    this.loading$.next(true);

    this.response$ = this.service
      .getAll()
      .pipe(tap(() => this.loading$.next(false)));

    this.list$ = this.response$.pipe(
      // map((response) => (Math.random() > 0.5 ? response.result : [])),
      map((response) => response.result.slice(0, 10))
      // map((response) => response.result),
    );
  }

  public toggleJsonView() {
    this.jsonView$.next(!this.jsonView$.value);
  }

  public addNewItem() {
    const newItem: Partial<Animal> = { isEditing: true };
    this.editingElement$.next(newItem);
  }

  public save(animal: Animal) {
    if (!animal) return;

    if (animal.animalId) {
      this.update(animal);
    } else {
      this.create(animal);
    }

    this.editingElement$.next(null);
  }

  public create(animal: Animal) {
    if (!animal) return;

    this.service.create(animal).subscribe((response) => {
      this.fetchData();
    });
  }

  public update(animal: Animal) {
    if (!animal) return;

    this.service.update(animal.animalId, animal).subscribe((response) => {
      this.fetchData();
    });
  }

  public remove(animal: Animal) {
    if (!animal) return;

    this.service.remove(animal.animalId).subscribe((response) => {
      this.fetchData();
    });
  }
}
