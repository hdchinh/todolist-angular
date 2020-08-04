import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;

  constructor() { }

  ngOnChanges(): void {
    console.log('todos', this.todos);
  }

  ngOnInit(): void {
    this.idForTodo = 10;
    this.todoTitle = '';
    this.beforeEditCache = '';
    this.filter = 'all';
    this.todos = [
      {
        'id': 1,
        'title': 'The First Thing Need To Do',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'The Second Thing Need To Do',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'The Third Thing Need To Do',
        'completed': false,
        'editing': false,
      }
    ]
  }

  onEnter(value: string) {
    if (value.trim().length === 0) {
      return;
    }

    this.todoTitle = value;

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    });

    this.todoTitle = '';
    this.idForTodo++;

  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  editTodo(todo: Todo): void {
    todo.editing = true;
    this.beforeEditCache = todo.title;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed)
    }

    return this.todos;
  }
}
