import { Component } from '@angular/core';
import {PostService} from "../post.service";
import {ParsedPostModel} from "../../DTO/post-model";

@Component({
  selector: 'app-parsed-post',
  templateUrl: './parsed-post.component.html',
  styleUrls: ['./parsed-post.component.css']
})
export class ParsedPostComponent {
  parsedPosts?: Array<ParsedPostModel>
  constructor(private postService: PostService) {
    this.postService.getAllParsedPosts().subscribe(data => this.parsedPosts = data)
  }
}
