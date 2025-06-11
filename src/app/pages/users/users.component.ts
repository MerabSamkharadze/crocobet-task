import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
}

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  loading = true;
  filteredUsers: User[] = [];
  searchTerm = '';
  now = new Date();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((users) => {
        this.users = users;
        this.applyFilter();

        this.loading = false;
      });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter((u) => {
      const [first, ...rest] = u.name.split(' ');
      const last = rest.join(' ');
      return (
        u.name.toLowerCase().includes(term) ||
        last.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      );
    });
  }

  splitName(fullName: string): { first: string; last: string } {
    const [first, ...rest] = fullName.split(' ');
    return { first, last: rest.join(' ') };
  }
}
