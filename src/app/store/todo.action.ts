import { Todo } from "./todo.model";

export class AddTodo {
static readonly type = '[Todo] Add';
constructor(public payload: Todo){}
}


export class GetTodo {
static readonly type = '[Todo] Get';
}

export class DeleteTodo {
static readonly type = '[Todo] Delete';
constructor(public id: number) {}
}

export class UpdateTodo {
static readonly type = '[Todo] Update';
constructor(public payload: Todo, public id: number) {}
}

export class SelectTodo {
static readonly type = '[Todo] Select';
constructor(public payload: Todo) {}

}
