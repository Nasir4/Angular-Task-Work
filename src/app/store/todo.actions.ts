import { Action } from '@ngrx/store';
import { Todo } from '../class/todo';

export const ActionTypes = {
  LOAD_TODO: 'LOAD_TODO',
  // LOAD_SUCCESS: 'LOAD_SUCCESS',
  // LOAD_FAILURE: 'LOAD_FAILURE',
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  UPDATE_TODO: 'UPDATE_TODO'
};

export class LoadTodo implements Action {
  readonly type = ActionTypes.LOAD_TODO;

  constructor(public payload: any = null) {}
}

// export class LoadSuccess implements Action {
//   readonly type = ActionTypes.LOAD_SUCCESS;

//   constructor(public payload: any) {}
// }

// export class LoadFailure implements Action {
//   readonly type = ActionTypes.LOAD_FAILURE;

//   constructor(public payload: any) {}
// }

export class AddTodo implements Action {
  readonly type = ActionTypes.ADD_TODO;

  constructor(public payload: any) {}
}

export class ToggleTodo implements Action {
  readonly type = ActionTypes.TOGGLE_TODO;

  constructor(public payload: Todo) {}
}

export class RemoveTodo implements Action {
  readonly type = ActionTypes.REMOVE_TODO;

  constructor(public payload: { id: number }) {}
}

export class UpdateTodo implements Action {
  readonly type = ActionTypes.UPDATE_TODO;

  constructor(public payload: { id: number; newTodo: Todo }) {}
}

export type TodoActions =
  | LoadTodo
  | AddTodo
  | ToggleTodo
  | RemoveTodo
  | UpdateTodo;
