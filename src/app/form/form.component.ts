import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AddTodo, UpdateTodo, SelectTodo } from '../store/todo.action';
import { TodoState } from '../store/todo.store';
import { Observable } from 'rxjs';
import { Todo } from '../store/todo.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  editTodo = false;
  todoForm: FormGroup;

  @Select(TodoState.selectedtodo) selectedTodo: Observable<Todo>;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.todoForm = this.initForms();
    this.selectedTodo.subscribe((todo) => {
      if (todo) {
        this.todoForm.patchValue({
          id: todo.id,
          title: todo.title
        });
        this.editTodo = true;
      }else {
      this.editTodo = false;
      }
})
  }

  initForms = () => {
    return this.fb.group({
      id: [''],
      title: [''],
    });
  }

  onSubmit = () => {
    if (!this.editTodo) {
      this.store.dispatch(new AddTodo(this.todoForm.value)).subscribe((resp) => {
        this.todoForm.reset();
      });
    } else {
      this.store.dispatch(new UpdateTodo(this.todoForm.value, this.todoForm.value.id)).subscribe((resp) => {
        this.todoForm.reset();
        this.store.dispatch(new SelectTodo(null));
      });
    }
  }

}
