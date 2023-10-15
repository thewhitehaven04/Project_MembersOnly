export interface ISignUpRequest {
  name: string
  lastName: string
  username: string
  password: string
  confirm: string
}

export interface ISignUpUpdateView {
  data: {
    name: string
    lastName: string
    username: string
  }
}
