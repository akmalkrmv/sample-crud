import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @Input() element: Animal;
  @Input() canEdit: boolean = false;

  @Output() edit = new EventEmitter<Animal>();
  @Output() save = new EventEmitter<Animal>();
  @Output() cancel = new EventEmitter<Animal>();
  @Output() remove = new EventEmitter<Animal>();
}
