import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { AnimalColumns } from 'src/app/models/animal-columns';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnChanges {
  @Input() list: Partial<Animal>[];
  @Input() loading: boolean;
  @Input() jsonView: boolean;
  @Input() isEditing: boolean;
  @Input() newElement: Partial<Animal>;

  @Output() saved = new EventEmitter<Partial<Animal>>();
  @Output() removed = new EventEmitter<Partial<Animal>>();
  @Output() cancelled = new EventEmitter();

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

  private listCache: Partial<Animal>[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { jsonView, newElement, list } = changes;

    if (jsonView && jsonView.currentValue != jsonView.previousValue) {
      this.columnsToDisplay = this.jsonView
        ? this.jsonColumns
        : this.allColumns;
    }

    if (newElement && newElement.currentValue != newElement.previousValue) {
      this.list = this.newElement ? [this.newElement, ...this.list] : this.listCache;
      this.changeDetector.markForCheck();
    }

    
    if (list && list.currentValue != list.previousValue) {
      this.listCache = this.list;
    }

  }

  public get isEmpty() {
    return !this.list || !this.list.length;
  }

  public edit(animal: Animal) {
    const wasEditing = animal.isEditing;
    this.list.forEach((element) => (element.isEditing = false));
    animal.isEditing = !wasEditing;

    this.cancelled.emit();
  }

  public save(animal: Animal) {
    animal.isEditing = false;
    this.saved.emit(animal);
  }

  public cancel(animal: Animal) {
    animal.isEditing = false;
    this.cancelled.emit();
  }

  public remove(animal: Animal) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.removed.emit(animal);
    }
  }
}
