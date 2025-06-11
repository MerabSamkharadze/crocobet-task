import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPost, IUser} from '../helper';
import {IMainUser} from '../helper/interfaces/main-user.interface';

@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly DOMAIN_URL = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) {}

  fetchTodos(userId: number) {
    return this.http
      .get<any[]>(`${this.DOMAIN_URL}/todos?userId=${userId}`)
  }

  fetchUser() {
    return this.http
      .get<IMainUser[]>(`${this.DOMAIN_URL}/users`)
  }

  fetchUserPost(userId: number) {
    return this.http
      .get<IPost[]>(`${this.DOMAIN_URL}/posts?userId=${userId}`)
  }
}
