import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Animal } from 'src/app/models/events';
import { AnimalColumnMeta } from 'src/app/models/event-columns';

@Component({
  selector: 'app-simple-column',
  templateUrl: './simple-column.component.html',
  styleUrls: ['./simple-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleColumnComponent {
  @Input() element: Animal;
  @Input() isEditing: boolean;
  @Input() column: AnimalColumnMeta;
}
