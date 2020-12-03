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
  @Input() editingElement: Partial<Animal>;

  @Output() saved = new EventEmitter<Partial<Animal>>();
  @Output() removed = new EventEmitter<Partial<Animal>>();

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

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { jsonView, editingElement } = changes;

    if (jsonView && jsonView.currentValue != jsonView.previousValue) {
      this.columnsToDisplay = this.jsonView
        ? this.jsonColumns
        : this.allColumns;
    }

    if (
      editingElement &&
      editingElement.currentValue != editingElement.previousValue
    ) {
      this.list = [this.editingElement, ...this.list];
      this.changeDetector.markForCheck();
    }
  }

  public get isEmpty() {
    return !this.list || !this.list.length;
  }

  public edit(animal: Animal) {
    const wasEditing = animal.isEditing;
    this.list.forEach((element) => (element.isEditing = false));
    animal.isEditing = !wasEditing;
    this.editingElement = animal;
  }

  public save(animal: Animal) {
    animal.isEditing = false;
    this.saved.emit(this.editingElement);
  }

  public cancel(animal: Animal) {
    animal.isEditing = false;
  }

  public remove(animal: Animal) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.removed.emit(animal);
    }
  }
}
