import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {CommentResponse} from "../../post/view-post/CommentResponse";
import {DatePipe} from "@angular/common";
import {AuthService} from "../shared/auth.service";
import {PostService} from "../../shared/post.service";
import {CommentService} from "../../shared/comment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  posts!: Array<PostModel>
  comments!: Array<CommentResponse>
  username!: string
  postLength!: number
  commentLength!: number
  constructor(private activatedRoute: ActivatedRoute, public datePipe: DatePipe, private authService: AuthService, private postService: PostService,
              private commentService: CommentService) {
    this.username = this.activatedRoute.snapshot.params['username'];

    this.postService.getPostsByUserName(this.username).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getCommentsByUser(this.username).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
  }
}
