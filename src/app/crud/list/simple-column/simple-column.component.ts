import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event, EventColumnMeta } from '@models/index';

@Component({
  selector: 'app-simple-column',
  templateUrl: './simple-column.component.html',
  styleUrls: ['./simple-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleColumnComponent {
  @Input() element: Event;
  @Input() isEditing: boolean;
  @Input() column: EventColumnMeta;
}
