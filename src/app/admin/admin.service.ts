import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParsedPostResponse} from "./admin/parsedPostResponse";
import {ParsedPostRequest} from "./admin/parsedPostRequest";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {
  }
  getParsedPost(postId: number): Observable<ParsedPostResponse> {
    return this.httpClient.get<ParsedPostResponse>("http://localhost:8080/api/parsed-post" + postId)
  }

  refreshParsedPosts(): Observable<Array<ParsedPostResponse>> {
    return this.httpClient.post<Array<ParsedPostResponse>>("http://localhost:8080/api/parsed-post", undefined)
  }

  updateParsedPost(postId: number, parsedPostBody: ParsedPostRequest): Observable<ParsedPostResponse> {
    return this.httpClient.put<ParsedPostResponse>("http://localhost:8080/api/parsed-post" + postId, parsedPostBody)
  }

  deleteParsedPost(postId: number): Observable<ParsedPostResponse> {
    return this.httpClient.delete<ParsedPostResponse>("http://localhost:8080/api/parsed-post" + postId)
  }}
