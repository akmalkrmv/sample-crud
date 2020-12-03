import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Event } from '@models/index';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @Input() element: Event;
  @Input() canEdit: boolean = false;

  @Output() edit = new EventEmitter<Event>();
  @Output() save = new EventEmitter<Event>();
  @Output() cancel = new EventEmitter<Event>();
  @Output() remove = new EventEmitter<Event>();
}
