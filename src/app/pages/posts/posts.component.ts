import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, Post } from '../../services/posts.service';
import { PostModalComponent } from '../../components/post-modal/post-modal.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostModalComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts: Post[] = [];
  loading = true;
  selectedPost: Post | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((data) => {
      this.posts = data;
      this.loading = false;
    });
  }

  openModal(post: Post) {
    this.selectedPost = post;
  }

  closeModal() {
    this.selectedPost = null;
  }
}
