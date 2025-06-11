import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../services/posts.service';

@Component({
  selector: 'app-post-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent {
  @Input() post!: Post;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
