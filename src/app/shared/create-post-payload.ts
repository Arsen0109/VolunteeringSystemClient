export interface CreatePostPayload {
  postName: string,
  description: string,
  cardNumber: string,
  monoBankJarLink?: string,
  isOpened?: boolean,
}
