import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../DTO/post-model";
import {MonoBankJarProperties, PostService} from "../../shared/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {CommentResponse} from "../../DTO/commentResponse";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentRequest} from "../../DTO/commentRequest";
import {CommentService} from "../../shared/comment.service";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/shared/auth.service";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit{
  postId: number;
  post!: PostModel;
  comments: Array<CommentResponse> = []
  commentForm!: FormGroup
  createCommentRequestPayload: CommentRequest


  constructor(private postService: PostService, private activateRoute: ActivatedRoute, public datePipe: DatePipe,
              private commentService: CommentService, public authService: AuthService, private router: Router,
              private toastr: ToastrService) {
    this.postId = this.activateRoute.snapshot.params['id'];
    this.postService.getPostById(this.postId).subscribe(data => {
      this.post = data;
    });

    this.createCommentRequestPayload = {
      postId: this.postId,
      text: ''
    }
    commentService.getCommentsForPost(this.postId).subscribe(data =>
      this.comments = data)
  }

  currentUserIsPostCreator(): boolean {
    return this.authService.getUserName() == this.post.username
}
  ngOnInit(): void {
    this.commentForm = new FormGroup({
      text: new FormControl(undefined, Validators.required)
    })
  }

  postComment() {
    this.createCommentRequestPayload.text = this.commentForm.get("text")?.value
    this.commentService.createComment(this.createCommentRequestPayload).subscribe(() => {
        this.commentForm.get("text")?.setValue('')
        this.commentService.getCommentsForPost(this.postId).subscribe(data => this.comments = data)
      }
    )
  }

  navigateToUpdatePostPage(){
      this.router.navigateByUrl(`/update-post/${this.postId}`)
  }

  deletePost() {
    this.postService.deletePostById(this.postId).subscribe(data => console.log(data))
    this.toastr.success("Post deleted successfully")
    this.router.navigateByUrl("/")
  }
  // getMonoBankJarProperties(monoBankJarLink: string): string {
    // const monoBankJarProps: Observable<any> = this.postService.getMonoBankJarProps(monoBankJarLink)
    // monoBankJarProps.subscribe(data => console.log(data))
    // if (!monoBankJarProps.hasJarGoal || !monoBankJarProps.isOpened) {
    //   return `width: ${monoBankJarProps.jarProgress}%`
    // }
  //   return "display: none"
  // }
}
