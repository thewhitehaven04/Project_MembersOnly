export interface INewMessageRequest {
  title: string
  text: string
}

export interface INewMessageDataView {
  data: INewMessageRequest 
} 

export interface IMessageView {
  id: string,
  title: string,
  text: string,
  author: string,
  timestamp: string,
}


export interface IMessageListResponse {
  messages: IMessageView[] 
}