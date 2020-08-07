import { Todo } from './todo.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetTodo, AddTodo, DeleteTodo, UpdateTodo, SelectTodo } from './todo.action';
import { TodoService } from './todo.service';
import { tap } from 'rxjs/operators';
export class TodoStateModel {

  todos: Todo[];
  selected: Todo;

}



@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
    selected: null,
  }
})
export class TodoState {

  constructor(public todoService: TodoService) { }

  @Selector()
  static getTodoList(state: TodoStateModel) {
    return state.todos;
  }

  @Selector()
  static selectedtodo(state: TodoStateModel) {
    return state.selected;
}

  @Action(GetTodo)
  getTodos({ getState, setState }: StateContext<TodoStateModel>) {
    return this.todoService.fetchTodos().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        todos: result,
      });

    }));

  }

  @Action(AddTodo)
  addTodo({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
    return this.todoService.addTodo(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        todos: [...state.todos, result]
      });
    }));
  }

  @Action(DeleteTodo)
  deleteTodo({ getState, setState }: StateContext<TodoStateModel>, { id }: DeleteTodo) {
    return this.todoService.deleteTodo(id).pipe(tap((result) => {

      const state = getState();
      const filteredArray = state.todos.filter((item) => item.id !== id);
      setState({
        ...state,
        todos: filteredArray
      });
    }));

  }

  @Action(UpdateTodo)
  updateTodo({ getState, setState }: StateContext<TodoStateModel>, { payload, id }: UpdateTodo) {
    return this.todoService.updateTodo(payload, id).pipe((tap((result) => {
      const state = getState();
      const todoList = [...state.todos];
      const todoIndex = todoList.findIndex((item) => item.id === id);
      todoList[todoIndex] = result;

      setState({
        ...state,
        todos: todoList
      });
    })));


  }

  @Action(SelectTodo)
  selectTodo({ getState, setState }: StateContext<TodoStateModel>, { payload }: SelectTodo) {
    const state = getState();
    setState({
      ...state,
      selected: payload
    });
  }

}
