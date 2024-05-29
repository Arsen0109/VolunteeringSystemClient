import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentRequest} from "../../DTO/commentRequest";
import {CommentService} from "../../shared/comment.service";
import {AuthService} from "../../auth/shared/auth.service";

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.css']
})
export class AdminCommentComponent implements OnInit {
  updateCommentForm!: FormGroup;
  updateCommentPayload!: CommentRequest
  userIsAdmin!: boolean
  commentIsUpdated = false
  commentIsDeleted = false

  constructor(private commentService: CommentService, private authService: AuthService) {
    this.updateCommentPayload = {
      text: ''
    }
  }

  ngOnInit() {
    this.userIsAdmin = JSON.parse(this.authService.getAdmin());
    this.updateCommentForm = new FormGroup({
      commentId: new FormControl('', Validators.required),
      postId: new FormControl(''),
      text: new FormControl('', Validators.required),
      username: new FormControl(''),
      createdDate: new FormControl(''),
    });
  }

  updateComment(){
    const commentId: number = this.updateCommentForm.get("commentId")?.value;
    this.updateCommentPayload.text = this.updateCommentForm.get('text')?.value;
      try {
        this.commentService.updateComment(commentId, this.updateCommentPayload).subscribe(data => {
          this.clearForm()
          this.commentIsUpdated = true;
          setTimeout(() => {
            this.commentIsUpdated = false
          }, 2000)
        })
      } catch (e) {
        throw Error("Error occurred while updating post")
      }
  }

  clearForm() {
    this.updateCommentForm.get("commentId")?.reset()
    this.updateCommentForm.get("postId")?.reset()
    this.updateCommentForm.get("text")?.reset()
    this.updateCommentForm.get("username")?.reset()
    this.updateCommentForm.get("createdDate")?.reset()
  }
  deleteComment(){
    this.commentService.deleteComment(this.updateCommentForm.get("commentId")?.value).subscribe(data => {
      this.clearForm()
      this.commentIsDeleted = true;
      setTimeout(() => {
        this.commentIsDeleted = false
      }, 2000)
    })
  }
  getComment() {
    this.commentService.getCommentById(this.updateCommentForm.get("commentId")?.value).subscribe(data => {
      this.updateCommentForm.get("text")?.setValue(data.text)
      this.updateCommentForm.get("postId")?.setValue(data.postId)
      this.updateCommentForm.get("username")?.setValue(data.username)
      this.updateCommentForm.get("createdDate")?.setValue(data.createdDate.toLocaleString())
    })
  }

}
