export interface PostModel {
  postId: number,
  postName: string,
  description: string,
  cardNumber: string,
  monoBankJarLink: string,
  username: string,
  isOpened: boolean,
  createdDate: Date
}

export interface ParsedPostModel {
  postId: number,
  postName: string,
  url: string,
  description: string,
  platformName: string,
  iconUrl: string
}
