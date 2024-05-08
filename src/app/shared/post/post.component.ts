import {Component, Input} from '@angular/core';
import {PostModel} from "../post-model";
import { faComments } from '@fortawesome/free-solid-svg-icons';
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() data!: Array<PostModel>;
  faComments = faComments;

  constructor(public datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
  }

  getPostUrl(postId: number) {
    return `/view-post/${postId}`
  }
}
