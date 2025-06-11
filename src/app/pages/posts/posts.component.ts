import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from '../../services/posts.service';
import { PostModalComponent } from '../../components/post-modal/post-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  imports: [CommonModule, PostModalComponent],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  selectedPost: Post | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPostsWithAuthors().subscribe((posts) => {
      this.posts = posts;
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
