import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../DTO/post-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../shared/post.service";
import {PostRequestPayload} from "../../DTO/post-request-payload";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  post!: PostModel
  postId!: number
  postForm!: FormGroup
  updatePostPayload!: PostRequestPayload
  cardNumberIsValid = true
  monoBankJarLinkIsValid = true

  ngOnInit(): void {
    this.postForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      monoBankJarLink: new FormControl(undefined),
      cardNumber: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl(''),
    });


    // this.postForm.get('postName')?.setValue(this.post.postName)
    // this.postForm.get('monoBankJarLink')?.setValue(this.post.monoBankJarLink)
    // this.postForm.get('cardNumber')?.setValue(this.post.cardNumber)
    // this.postForm.get('description')?.setValue(this.post.description)
    // this.postForm.get('date')?.setValue(this.post.createdDate)
  }
   constructor(private postService: PostService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) {
     this.postId = this.activatedRoute.snapshot.params['id']
     this.postService.getPostById(this.postId).subscribe(data => {
       this.post = data;
     });
     this.updatePostPayload = {
       postName: '',
       description: '',
       cardNumber: ''
     }
   }

   updatePost() {
    this.updatePostPayload.postName = this.postForm.get('postName')?.value
    this.updatePostPayload.description = this.postForm.get('description')?.value
    this.updatePostPayload.cardNumber = this.postForm.get('cardNumber')?.value


     // Check if monobank jar link exists and is valid. If not set an error.
     const formMonoJarLink = this.postForm.get('monoBankJarLink')?.value
     if (formMonoJarLink != undefined) {
       this.monoBankJarLinkIsValid =
         this.postService.monoBankJarLinkIsValid(formMonoJarLink)
       this.updatePostPayload.monoBankJarLink = formMonoJarLink
     }

     // Check if card number is valid
     this.cardNumberIsValid = this.validateCardNumber(this.updatePostPayload.cardNumber)
     if (this.monoBankJarLinkIsValid && this.cardNumberIsValid) {
       try {
         this.postService.updatePost(this.postId, this.updatePostPayload).subscribe(data => {
         })
         this.toastr.success("Post updated succesfully")
         this.router.navigateByUrl(`/view-post/${this.postId}`)
       } catch (e) {
         throw Error("Error occurred while creating post")
       }
     } else {
       throw Error("Error not valid monobank jar url")
     }
  }

  validateCardNumber(cardNumber: string): boolean{
    const trimmedCardNumber: string = cardNumber.replaceAll(" ", "")
    console.log(trimmedCardNumber)
    return (!isNaN(Number(trimmedCardNumber))) && trimmedCardNumber.length == 16
  }
}
