import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TodoState } from '../store/todo.store';
import { Observable } from 'rxjs';
import { Todo } from '../store/todo.model';
import { GetTodo, DeleteTodo, SelectTodo } from '../store/todo.action';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;

  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetTodo);
  }

  onDelete = (id: number) => {
    this.store.dispatch(new DeleteTodo(id));
  }

  onSelect = (todo: Todo) => {
    this.store.dispatch(new SelectTodo(todo));
  }


}
