import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './components/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TasksListService } from './services/tasks-list/tasks-list.service';
import { TaskService } from './services/task/task.service';
import { HttpClientModule } from '@angular/common/http';
import { AddCardComponent } from './components/add-card/add-card.component';
import { TasksColumnComponent } from './components/tasks-column/tasks-column.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    BoardComponent,
    AddCardComponent,
    TasksColumnComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BoardRoutingModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    TasksListService,
    TaskService
  ]
})
export class BoardModule { }
