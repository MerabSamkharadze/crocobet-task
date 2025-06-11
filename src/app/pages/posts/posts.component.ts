import { Component, OnInit } from '@angular/core';
import { PostsService, } from '../../services/posts.service';
import { PostModalComponent } from '../../components/post-modal/post-modal.component';
import { CommonModule } from '@angular/common';
import {IPost} from '../../helper';

@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  imports: [CommonModule, PostModalComponent],
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];
  loading = true;
  selectedPost: IPost | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPostsWithAuthors().subscribe((posts) => {
      this.posts = posts;
      this.loading = false;
    });
  }

  openModal(post: IPost) {
    this.selectedPost = post;
  }

  closeModal() {
    this.selectedPost = null;
  }
}
