import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { ListComponent } from './list/list.component';
import { ActionsComponent } from './list/actions/actions.component';
import { JsonColumnComponent } from './list/json-column/json-column.component';
import { SimpleColumnComponent } from './list/simple-column/simple-column.component';

@NgModule({
  declarations: [
    CrudComponent,
    ListComponent,
    ActionsComponent,
    JsonColumnComponent,
    SimpleColumnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    
    CrudRoutingModule,
  ],
})
export class CrudModule {}
