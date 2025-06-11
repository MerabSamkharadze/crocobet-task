import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute,} from '@angular/router';
import {ApiService} from '../../services/api.service';
import { map, Observable} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-user-posts',
  imports: [CommonModule],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {}

  private apiService = inject(ApiService)

  apiData!: Observable<any>

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId')
    const userName = this.route.snapshot.queryParams['userName'];

    if(userId) {
      this.apiData = this.apiService.fetchUserPost(+userId).pipe(
        map((posts) => {

          return  {
            userName,
            posts: posts,
          }
        })
      )
    }
  }
}
