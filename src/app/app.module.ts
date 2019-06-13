import { TodoDataService } from './services/todo-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/todo.effects';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { todoReducer } from './store/todo.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      todos: todoReducer
    }),
    StoreDevtoolsModule.instrument(),
    // EffectsModule.forRoot([TaskEffects])
  ],
  providers: [TodoDataService, TaskEffects],
  bootstrap: [AppComponent]
})
export class AppModule {}
