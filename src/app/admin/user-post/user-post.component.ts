import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostRequestPayload} from "../../DTO/post-request-payload";
import {PostService} from "../../shared/post.service";
import {AuthService} from "../../auth/shared/auth.service";

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  updatePostForm!: FormGroup;
  updatePostPayload!: PostRequestPayload
  userIsAdmin!: boolean
  monoBankJarLinkIsValid = true
  cardNumberIsValid = true
  postIsUpdated = false
  postIsDeleted = false

  constructor(private postService: PostService, private authService: AuthService) {
    this.updatePostPayload = {
      postName: '',
      description: '',
      cardNumber: '',
      isOpened: true,
    }
  }

  ngOnInit() {
    this.userIsAdmin = JSON.parse(this.authService.getAdmin());
    this.updatePostForm = new FormGroup({
      postId: new FormControl('', Validators.required),
      postName: new FormControl('', Validators.required),
      monoBankJarLink: new FormControl(undefined),
      cardNumber: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      username: new FormControl(''),
      isOpened: new FormControl(''),
      date: new FormControl(''),
    });
  }

  updatePost(){
    const postId: number = this.updatePostForm.get("postId")?.value;
    this.updatePostPayload.postName = this.updatePostForm.get('postName')?.value;
    this.updatePostPayload.description = this.updatePostForm.get('description')?.value;
    this.updatePostPayload.cardNumber = this.updatePostForm.get('cardNumber')?.value;

      // Check if monobank jar link exists and is valid. If not set an error.

    const formMonoJarLink = this.updatePostForm.get('monoBankJarLink')?.value
    if (formMonoJarLink != undefined) {
      this.monoBankJarLinkIsValid = this.postService.monoBankJarLinkIsValid(formMonoJarLink)
      this.updatePostPayload.monoBankJarLink = formMonoJarLink
    }

    // Check if card number is valid
    this.cardNumberIsValid = this.validateCardNumber(this.updatePostPayload.cardNumber)
    if (this.monoBankJarLinkIsValid && this.cardNumberIsValid) {
      try {
        this.postService.updatePost(postId, this.updatePostPayload).subscribe(data => {
          this.clearForm()
          this.postIsUpdated = true;
          setTimeout(() => {
            this.postIsUpdated = false
          }, 2000)
        })
      } catch (e) {
        throw Error("Error occurred while updating post")
      }
    } else {
      throw Error("Error not valid monobank jar url")
    }
  }
  clearForm() {
    this.updatePostForm.get("postId")?.reset()
    this.updatePostForm.get("postName")?.reset()
    this.updatePostForm.get("description")?.reset()
    this.updatePostForm.get("cardNumber")?.reset()
    this.updatePostForm.get("monoBankJarLink")?.reset()
    this.updatePostForm.get("username")?.reset()
    this.updatePostForm.get("isOpened")?.reset()
    this.updatePostForm.get("date")?.reset()
  }
  deletePost(){
    this.postService.deletePostById(this.updatePostForm.get("postId")?.value).subscribe(data => {
      this.clearForm()
      this.postIsDeleted = true;
      setTimeout(() => {
        this.postIsDeleted = false
      }, 2000)
    })
  }
  getPost() {
    this.postService.getPostById(this.updatePostForm.get("postId")?.value).subscribe(data => {
      this.updatePostForm.get("postName")?.setValue(data.postName)
      this.updatePostForm.get("description")?.setValue(data.description)
      this.updatePostForm.get("cardNumber")?.setValue(data.cardNumber)
      this.updatePostForm.get("monoBankJarLink")?.setValue(data.monoBankJarLink)
      this.updatePostForm.get("username")?.setValue(data.username)
      this.updatePostForm.get("isOpened")?.setValue(data.isOpened ? "Fundraise is Opened": "Fundraise is closed")
      this.updatePostForm.get("date")?.setValue(data.createdDate.toLocaleString())
    })
  }
  validateCardNumber(cardNumber: string): boolean{
    const trimmedCardNumber: string = cardNumber.replaceAll(" ", "")
    console.log(trimmedCardNumber)
    return (!isNaN(Number(trimmedCardNumber))) && trimmedCardNumber.length == 16
  }
}
