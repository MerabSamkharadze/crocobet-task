import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, forkJoin, Observable } from 'rxjs';
import {IPost, IUser} from '../helper';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly DOMAIN_URL = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) {}

  getPostsWithAuthors(): Observable<IPost[]> {
    return forkJoin([this.postsApi$(), this.userApi$()]).pipe(
      map(([posts, users]) => {
        return posts.map((post) => {
          const user = users.find((u) => u.id === post.userId);

          return { ...post, authorName: user?.name || 'Unknown' };
        });
      })
    );
  }

  private userApi$() {
    return this.http.get<IUser[]>(
      `${this.DOMAIN_URL}/users`
    );
  }

  private postsApi$() {
    return this.http.get<IPost[]>(
      `${this.DOMAIN_URL}/posts`
    );
  }
}
