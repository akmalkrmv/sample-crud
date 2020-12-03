import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Animal, AnimalColumns } from 'src/app/models/animal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnChanges {
  @Input() list: Animal[];
  @Input() loading: boolean;
  @Input() jsonView: boolean;
  @Input() isEditing: boolean;

  public columns = AnimalColumns;
  public columnsToDisplay = [];

  public allColumns: string[] = [
    'index',
    ...AnimalColumns.map((column) => column.name),
    'actions',
  ];

  public jsonColumns: string[] = [
    'index',
    ...AnimalColumns.map((column) => column.name).slice(0, 5),
    'json',
    'actions',
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.jsonView &&
      changes.jsonView.currentValue != changes.jsonView.previousValue
    )
      this.columnsToDisplay = this.jsonView
        ? this.jsonColumns
        : this.allColumns;
  }

  public get isEmpty() {
    return !this.list || !this.list.length;
  }

  public edit(animal: Animal) {
    const wasEditing = animal.isEditing;
    this.list.forEach((element) => (element.isEditing = false));
    animal.isEditing = !wasEditing;
  }
  public save(animal: Animal) {
    animal.isEditing = false;
  }
  public cancel(animal: Animal) {
    animal.isEditing = false;
  }
  public remove(animal: Animal) {
    if (confirm('Are you sure you want to delete this item?')) {
    }
  }
}
