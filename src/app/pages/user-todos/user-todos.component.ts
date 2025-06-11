import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.scss'],
})
export class UserTodosComponent implements OnInit {
  todos: any[] = [];
  userId!: number;
  username: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.fetchUser();
    this.fetchTodos();
  }

  fetchUser(): void {
    this.http
      .get<any>(`https://jsonplaceholder.typicode.com/users/${this.userId}`)
      .subscribe((user) => {
        this.username = user.name;
      });
  }

  fetchTodos(): void {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data) => {
        this.todos = data.filter((todo) => todo.userId === this.userId);
      });
  }
}
