import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as TaskActions from './todo.actions';
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TodoDataService } from '../services/todo-data.service';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoDataService
  ) {}

  // @Effect()
  // loadActions$: Observable<any> = this.actions$.pipe(
  //   ofType(TaskActions.ActionTypes.LOAD_TODO),
  //   switchMap(() =>
  //     this.todoService
  //       .getAllTodos()
  //       .map(res => new TaskActions.LoadSuccess(res))
  //   )
  // );
}
