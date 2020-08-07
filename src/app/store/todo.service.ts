import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  data = [{
    'id': 1,
    'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  },
  {
    'id': 2,
    'title': 'qui est esse',
  },
  {
    'id': 3,
    'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
  },];
  constructor(public http: HttpClient) { }

  fetchTodos() {
    // return of(this.data);
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  addTodo(payload: Todo) {
    console.log(payload);
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', payload);
    // this.data.push(payload);
    // return of(this.data[this.data.length-1]);
  }

  deleteTodo(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  updateTodo(payload: Todo, id: number) {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, payload);
  }

}
