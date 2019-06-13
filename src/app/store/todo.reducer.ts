import { AppState } from './app.state';
import { Todo } from './../class/todo';
import { TodoActions, ActionTypes, ToggleTodo } from './todo.actions';

const initialState: Todo = {
  id: 1,
  title: 'Cook Dinner',
  date: '2018-11-18',
  complete: false
};

export function todoReducer(state = [initialState], action: TodoActions) {
  switch (action.type) {
    case ActionTypes.LOAD_TODO:
      return [...state, action.payload];

    case ActionTypes.ADD_TODO:
      action.payload.id = state.length + 1;
      return [...state, action.payload];

    case ActionTypes.UPDATE_TODO:
      return state.map(todo => {
        return todo.id === action.payload.id ? action.payload.newTodo : todo;
      });

    case ActionTypes.TOGGLE_TODO:
      return state.map(todo => {
        return todo.id === action.payload.id
          ? Object.assign({}, todo, { complete: !action.payload.complete })
          : todo;
      });

    case ActionTypes.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);

    default:
      return state;
  }
}
