import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'users/:userId/posts',
    loadComponent: () =>
      import('./pages/user-posts/user-posts.component').then(
        (m) => m.UserPostsComponent
      ),
  },
  {
    path: 'users/:userId/todos',
    loadComponent: () =>
      import('./pages/user-todos/user-todos.component').then(
        (m) => m.UserTodosComponent
      ),
  },
];
