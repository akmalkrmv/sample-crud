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
import { Event, EventColumns } from '@models/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnChanges {
  @Input() list: Partial<Event>[];
  @Input() loading: boolean;
  @Input() jsonView: boolean;
  @Input() isEditing: boolean;
  @Input() newElement: Partial<Event>;

  @Output() saved = new EventEmitter<Partial<Event>>();
  @Output() removed = new EventEmitter<Partial<Event>>();
  @Output() cancelled = new EventEmitter();

  public columns = EventColumns;
  public columnsToDisplay = [];

  public allColumns: string[] = [
    'index',
    ...EventColumns.map((column) => column.name),
    'actions',
  ];

  public jsonColumns: string[] = [
    'index',
    ...EventColumns.map((column) => column.name).slice(0, 5),
    'json',
    'actions',
  ];

  private listCache: Partial<Event>[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { jsonView, newElement, list } = changes;

    if (jsonView && jsonView.currentValue != jsonView.previousValue) {
      this.columnsToDisplay = this.jsonView
        ? this.jsonColumns
        : this.allColumns;
    }

    if (newElement && newElement.currentValue != newElement.previousValue) {
      this.list = this.newElement
        ? [this.newElement, ...this.list]
        : this.listCache;
      this.changeDetector.markForCheck();
    }

    if (list && list.currentValue != list.previousValue) {
      this.listCache = this.list;
    }
  }

  public get isEmpty() {
    return !this.list || !this.list.length;
  }

  public edit(animal: Event) {
    const wasEditing = animal.isEditing;
    this.list.forEach((element) => (element.isEditing = false));
    animal.isEditing = !wasEditing;

    this.cancelled.emit();
  }

  public save(animal: Event) {
    animal.isEditing = false;
    this.saved.emit(animal);
  }

  public cancel(animal: Event) {
    animal.isEditing = false;
    this.cancelled.emit();
  }

  public remove(animal: Event) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.removed.emit(animal);
    }
  }
}
