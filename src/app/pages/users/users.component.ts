import {Component, computed, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersPageComponent {
  loading = true;
  searchTerm = '';

 private apiService = inject(ApiService)

  filterValue = signal('')
  usersSignal = toSignal(this.apiService.fetchUser())

  fetchUser = computed(() => {
    if(!this.usersSignal()?.length) return []

     setTimeout(() => {
       this.loading = false
     },500)

    return this.usersSignal()?.filter(u => {
      const [first, ...rest] = u.name.split(' ');
      const last = rest.join(' ');

      return u.name.toLowerCase().includes(this.filterValue()) ||
        last.toLowerCase().includes(this.filterValue()) ||
        u.email.toLowerCase().includes(this.filterValue())
    })
  })

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filterValue.set(term)
  }

  splitName(fullName: string): { first: string; last: string } {
    const [first, ...rest] = fullName.split(' ');
    return { first, last: rest.join(' ') };
  }
}
