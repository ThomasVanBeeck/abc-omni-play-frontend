import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/event';
import { IonicModule } from '@ionic/angular';
import { formatDate, NgForOf } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ],
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() isParent = true;
  date: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.date = formatDate(this.comment.createdOn, 'dd/MM/yyyy HH:mm', 'en-US');
  }

}
