import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-json-column',
  templateUrl: './json-column.component.html',
  styleUrls: ['./json-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonColumnComponent {
  @Input() element: Animal;
}
