import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../shared/post.service";
import {PostRequestPayload} from "../../DTO/post-request-payload";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm!: FormGroup;
  createPostPayload!: PostRequestPayload
  monoBankJarLinkIsValid = true
  cardNumberIsValid = true
  constructor(private postService: PostService, private router: Router) {
    this.createPostPayload = {
      postName: '',
      description: '',
      cardNumber: '',
      isOpened: true,
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      monoBankJarLink: new FormControl(undefined),
      cardNumber: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  createPost(){
    this.createPostPayload.postName = this.createPostForm.get('postName')?.value;
    this.createPostPayload.description = this.createPostForm.get('description')?.value;
    this.createPostPayload.cardNumber = this.createPostForm.get('cardNumber')?.value;

    // Check if monobank jar link exists and is valid. If not set an error.

    const formMonoJarLink = this.createPostForm.get('monoBankJarLink')?.value
    if (formMonoJarLink != undefined) {
      this.monoBankJarLinkIsValid =
        this.postService.monoBankJarLinkIsValid(formMonoJarLink)
      this.createPostPayload.monoBankJarLink = formMonoJarLink
    }

    // Check if card number is valid
    this.cardNumberIsValid = this.validateCardNumber(this.createPostPayload.cardNumber)
    if (this.monoBankJarLinkIsValid && this.cardNumberIsValid) {
      try {
        this.postService.createPost(this.createPostPayload).subscribe(data => {
          this.router.navigateByUrl("/")
        })
      } catch (e) {
        throw Error("Error occurred while creating post")
      }
    } else {
      throw Error("Error not valid monobank jar url")
    }
  }
  discardPost(){
    this.router.navigateByUrl("/")
  }
  validateCardNumber(cardNumber: string): boolean{
    const trimmedCardNumber: string = cardNumber.replaceAll(" ", "")
    console.log(trimmedCardNumber)
    return (!isNaN(Number(trimmedCardNumber))) && trimmedCardNumber.length == 16
  }
}
