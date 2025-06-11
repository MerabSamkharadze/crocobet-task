import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-user-posts',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  userId!: number;
  posts: any[] = [];
  userName: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('userId'));
      this.fetchUser();
      this.fetchUserPosts();
    });
  }

  fetchUser() {
    this.http
      .get<any>(`https://jsonplaceholder.typicode.com/users/${this.userId}`)
      .subscribe((user) => (this.userName = user.name));
  }

  fetchUserPosts() {
    this.http
      .get<any[]>(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`
      )
      .subscribe((data) => (this.posts = data));
  }
}
