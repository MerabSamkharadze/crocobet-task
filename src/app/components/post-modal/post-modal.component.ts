import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../helper';

@Component({
  selector: 'app-post-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent {
  @Input() post: IPost | null = null;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
