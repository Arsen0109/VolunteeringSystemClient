import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentRequest} from "../DTO/commentRequest";
import {Observable} from "rxjs";
import {CommentResponse} from "../DTO/commentResponse";

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

  getCommentsByUser(username: string): Observable<Array<CommentResponse>> {
    return this.httpClient.get<Array<CommentResponse>>(`http://localhost:8080/api/comment/by-user/${username}`)
  }

  getCommentById(commentId: number): Observable<CommentResponse> {
    return this.httpClient.get<CommentResponse>(`http://localhost:8080/api/comment/${commentId}`)
  }

  updateComment(commentId: number, updateCommentRequest: CommentRequest): Observable<CommentResponse> {
    return this.httpClient.put<CommentResponse>(`http://localhost:8080/api/comment/${commentId}`, updateCommentRequest)
  }

  deleteComment(commentId: number): Observable<CommentResponse> {
    return this.httpClient.delete<CommentResponse>(`http://localhost:8080/api/comment/${commentId}`)
  }
}
