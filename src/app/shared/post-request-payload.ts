export interface PostRequestPayload {
  postName: string,
  description: string,
  cardNumber: string,
  monoBankJarLink?: string,
  isOpened?: boolean,
}
