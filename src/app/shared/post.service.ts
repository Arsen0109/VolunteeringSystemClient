import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "./post-model";
import {CreatePostPayload} from "./create-post-payload";
// @ts-ignore
import parseUrl from "parse-url"
import {catchError} from "rxjs/operators";
import {PostComponent} from "./post/post.component";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) {

  }

  getAllPosts(): Observable<Array<PostModel>>{
    return this.httpClient.get<Array<PostModel>>("http://localhost:8080/api/post")
  }

  createPost(createPostPayload: CreatePostPayload): Observable<PostModel>{
    return this.httpClient.post<PostModel>("http://localhost:8080/api/post", createPostPayload)
  }

  getPostById(postId: number): Observable<PostModel>{
    return this.httpClient.get<PostModel>("http://localhost:8080/api/post/" + postId)
  }

  monoBankJarLinkIsValid(monoBankJarLink: string): boolean {

    const monoBankApiUrl = "https://send.monobank.ua/api/handler"
    let isError = false

    try {
      const parsedUrl = parseUrl(monoBankJarLink)
      if (parsedUrl.resource !== "send.monobank.ua") return false
      const clientId = parsedUrl.pathname.split("/")[1]
      this.httpClient.post(monoBankApiUrl,
        {
          "c": "hello",
          "clientId": clientId,
          "Pc": "BBXHINsKar3hFQFbphcyCkpq+qDMPJ5NNgOISwwGKOX2gM+Usx2Pjo5dNKgHdar8L/mjMPE9bvSBqePlHEeVdBc="
        }
      )
    } catch (err) {
      isError = true
    }
    return !isError
  }
}
