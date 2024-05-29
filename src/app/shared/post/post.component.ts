import {Component, Input} from '@angular/core';
import {PostModel} from "../../DTO/post-model";
import { faComments } from '@fortawesome/free-solid-svg-icons';
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {MonoBankJarProperties, PostService} from "../post.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() data!: Array<PostModel>;
  faComments = faComments;


  constructor(public datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  getPostUrl(postId: number) {
    return `/view-post/${postId}`
  }
}
