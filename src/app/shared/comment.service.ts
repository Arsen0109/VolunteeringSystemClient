import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentRequest} from "../post/view-post/commentRequest";
import {Observable} from "rxjs";
import {CommentResponse} from "../post/view-post/CommentResponse";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  createComment(commentRequest: CommentRequest): Observable<CommentResponse>{
    return this.httpClient.post<CommentResponse>("http://localhost:8080/api/comment", commentRequest)
  }

  getCommentsForPost(postId: number): Observable<Array<CommentResponse>> {
    return this.httpClient.get<Array<CommentResponse>>(`http://localhost:8080/api/comment/by-post/${postId}`)
  }
}
