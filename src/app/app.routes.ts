import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
];
