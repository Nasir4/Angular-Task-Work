import { AppState } from './store/app.state';
import { Component, OnInit } from '@angular/core';
import { Todo } from './class/todo';
import { TodoDataService } from './services/todo-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos$: Observable<Todo[]>;
  newTodo: Todo = new Todo();
  getTodos: any;

  editForm: FormGroup;
  todo: any;
  titleValue: string;
  dateValue: string;
  isEdited = false;

  constructor(
    private todoService: TodoDataService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.todos$ = store.select('todos');
  }

  get todos() {
    // return this.todoService.getAllTodos();
    return this.todos$;
  }

  ngOnInit() {
    this.getTodos = this.todoService.getAllTodos();
    this.getTodos.forEach(todo => {
      this.store.dispatch(new TodoActions.LoadTodo(todo));
    });
  }

  addTodo() {
    if (this.newTodo.title && this.newTodo.date) {
      this.store.dispatch(new TodoActions.AddTodo(this.newTodo));
      this.todoService.addTodos(this.newTodo);
      this.newTodo = new Todo();
      this.newTodo.date = '';
    }
  }

  completeTodo(todo) {
    this.todoService.toggleTodo(todo);
    this.store.dispatch(new TodoActions.ToggleTodo(todo));
  }

  deleteTodo(todo) {
    this.store.dispatch(new TodoActions.RemoveTodo({ id: todo.id }));
    this.todoService.deleteTodoById(todo.id);
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo.id, this.editForm.value);
    const updatedTodo = {
      id: this.todo.id,
      title: this.editForm.value.title,
      date: this.editForm.value.date,
      complete: false
    };
    this.store.dispatch(
      new TodoActions.UpdateTodo({
        id: this.todo.id,
        newTodo: updatedTodo
      })
    );
    this.isEdited = true;
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 3000);
  }

  initForm(todo) {
    if (todo.date.year && todo.date.month) {
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [
          `${todo.date.year}-${todo.date.month}-${todo.date.day}`,
          Validators.required
        ]
      });
    }

    if (todo.date && !todo.date.month) {
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [`${todo.date}`, Validators.required]
      });
    }
  }

  open(content, todo) {
    this.isEdited = false;
    this.todo = {
      id: todo.id,
      complete: todo.complete,
      title: todo.title,
      date: todo.date
    };
    this.initForm(this.todo);
    if (todo.date.year && todo.date.month) {
      this.titleValue = `${todo.title}`;
      this.dateValue = `${todo.date.year}-${todo.date.month}-${todo.date.day}`;
    }

    if (todo.date && !todo.date.month) {
      this.titleValue = `${todo.title}`;
      this.dateValue = `${this.todo.date}`;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
