import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostRequestPayload} from "../../shared/post-request-payload";
import {PostService} from "../../shared/post.service";
import {Router} from "@angular/router";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  updatePostForm!: FormGroup;
  updatePostPayload!: PostRequestPayload
  monoBankJarLinkIsValid = true
  cardNumberIsValid = true
  postIsUpdated = false
  postIsDeleted = false

  constructor(private postService: PostService, private adminService: AdminService, private router: Router) {
    this.updatePostPayload = {
      postName: '',
      description: '',
      cardNumber: '',
      isOpened: true,
    }
  }

  ngOnInit() {
    this.updatePostForm = new FormGroup({
      postId: new FormControl('', Validators.required),
      postName: new FormControl('', Validators.required),
      monoBankJarLink: new FormControl(undefined),
      cardNumber: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
      this.monoBankJarLinkIsValid =
        this.postService.monoBankJarLinkIsValid(formMonoJarLink)
      this.updatePostPayload.monoBankJarLink = formMonoJarLink
    }

    // Check if card number is valid
    this.cardNumberIsValid = this.validateCardNumber(this.updatePostPayload.cardNumber)
    if (this.monoBankJarLinkIsValid && this.cardNumberIsValid) {
      try {
        this.postService.updatePost(postId, this.updatePostPayload).subscribe(data => {
          // Set form fields to updated post params
          this.updatePostForm.get("postName")?.setValue(data.postName)
          this.updatePostForm.get("description")?.setValue(data.description)
          this.updatePostForm.get("cardNumber")?.setValue(data.cardNumber)
          this.updatePostForm.get("monoBankJarLink")?.setValue(data.monoBankJarLink)

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
  }
  deletePost(){
    this.postService.deletePostById(this.updatePostForm.get("postId")?.value).subscribe(data => {
      this.clearForm()
    })
  }
  getPost() {
    this.postService.getPostById(this.updatePostForm.get("postId")?.value).subscribe(data => {
      this.updatePostForm.get("postName")?.setValue(data.postName)
      this.updatePostForm.get("description")?.setValue(data.description)
      this.updatePostForm.get("cardNumber")?.setValue(data.cardNumber)
      this.updatePostForm.get("monoBankJarLink")?.setValue(data.monoBankJarLink)
    })
  }
  validateCardNumber(cardNumber: string): boolean{
    const trimmedCardNumber: string = cardNumber.replaceAll(" ", "")
    console.log(trimmedCardNumber)
    return (!isNaN(Number(trimmedCardNumber))) && trimmedCardNumber.length == 16
  }
}
