import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ParsedPostRequest} from "../../DTO/parsedPostRequest";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-admin-parsed-post',
  templateUrl: './admin-parsed-post.component.html',
  styleUrls: ['./admin-parsed-post.component.css']
})
export class AdminParsedPostComponent implements OnInit {
  updateParsedPostForm!: FormGroup;
  updateParsedPostPayload!: ParsedPostRequest
  postIsUpdated = false
  postIsDeleted = false

  constructor(private adminService: AdminService, private router: Router) {
    this.updateParsedPostPayload = {
      postName: '',
      description: '',
      url: '',
      platformName: '',
      iconUrl: ''
    }
  }

  ngOnInit() {
    this.updateParsedPostForm = new FormGroup({
      postId: new FormControl('', Validators.required),
      postName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      platformName: new FormControl('', Validators.required),
      iconUrl: new FormControl('', Validators.required)
    });
  }

  updatePost(){
    const postId: number = this.updateParsedPostForm.get("postId")?.value;
    this.updateParsedPostPayload.postName = this.updateParsedPostForm.get('postName')?.value;
    this.updateParsedPostPayload.description = this.updateParsedPostForm.get('description')?.value;
    this.updateParsedPostPayload.url = this.updateParsedPostForm.get('url')?.value;
    this.updateParsedPostPayload.platformName = this.updateParsedPostForm.get('platformName')?.value;
    this.updateParsedPostPayload.iconUrl = this.updateParsedPostForm.get('iconUrl')?.value;

    // Check if card number is valid
      try {
        this.adminService.updateParsedPost(postId, this.updateParsedPostPayload).subscribe(data => {
          this.clearForm()
          this.postIsUpdated = true;
          setTimeout(() => {
            this.postIsUpdated = false
          }, 2000)
        })
      } catch (e) {
        throw Error("Error occurred while updating post")
      }
  }
  clearForm() {
    this.updateParsedPostForm.get("postId")?.reset()
    this.updateParsedPostForm.get("postName")?.reset()
    this.updateParsedPostForm.get("description")?.reset()
    this.updateParsedPostForm.get("url")?.reset()
    this.updateParsedPostForm.get("platformName")?.reset()
    this.updateParsedPostForm.get("iconUrl")?.reset()
  }
  deletePost(){
    this.adminService.deleteParsedPost(this.updateParsedPostForm.get("postId")?.value).subscribe(data => {
      this.clearForm()
      this.postIsDeleted = true;
      setTimeout(() => {
        this.postIsDeleted = false
      }, 2000)
    })
  }
  getPost() {
    this.adminService.getParsedPost(this.updateParsedPostForm.get("postId")?.value).subscribe(data => {
      this.updateParsedPostForm.get("postName")?.setValue(data.postName)
      this.updateParsedPostForm.get("description")?.setValue(data.description)
      this.updateParsedPostForm.get("url")?.setValue(data.url)
      this.updateParsedPostForm.get("platformName")?.setValue(data.platformName)
      this.updateParsedPostForm.get("iconUrl")?.setValue(data.iconUrl)
    })
  }
}
