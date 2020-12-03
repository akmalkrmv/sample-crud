import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from '@models/index';

@Component({
  selector: 'app-json-column',
  templateUrl: './json-column.component.html',
  styleUrls: ['./json-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonColumnComponent {
  @Input() element: Event;
  @Input() isEditing: boolean = false;
}
