import {Component, inject, OnInit,  signal,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ApiService} from '../../services/api.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.scss'],
})
export class UserTodosComponent implements OnInit {

  private route= inject(ActivatedRoute)
  private apiService= inject(ApiService)

  todosData!:Observable<any>

  userName = signal('')

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    const userName = this.route.snapshot.queryParams['userName'];

    this.userName.set(userName)

    if(userId ) {
      this.todosData  = this.apiService.fetchTodos(userId)
    }
  }
}
