import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, forkJoin, Observable } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  authorName?: string;
}

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPostsWithAuthors(): Observable<Post[]> {
    const posts$ = this.http.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
    const users$ = this.http.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );

    return forkJoin([posts$, users$]).pipe(
      map(([posts, users]) => {
        return posts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          return { ...post, authorName: user?.name || 'Unknown' };
        });
      })
    );
  }
}
